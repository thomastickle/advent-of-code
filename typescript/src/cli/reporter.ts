import { basename, dirname, relative } from "node:path"
import { inspect } from "node:util"
import { bold, dim, green, red } from "./theme.ts"

/**
 * A quiet node:test reporter that prints a tree (year > day > part) with a count at each leaf.
 * Failures are listed inline under the part they belong to; everything else stays one line.
 */

interface TestEvent {
    type: string
    data: Record<string, any>
}

type Status = "passed" | "failed" | "skipped"

interface Result {
    status: Status
    label: string
    detail: string[]
}

interface Node {
    label: string
    children: Map<string, Node>
    results: Result[]
}

const partPattern = /part\s*([12])/i

function describeFailure(error: any): string[] {
    const cause = error?.cause ?? error
    if (cause?.code === "ERR_ASSERTION" && "expected" in cause && "actual" in cause) {
        return [`expected ${inspect(cause.expected)}`, `actual   ${inspect(cause.actual)}`]
    }
    return String(cause?.message ?? cause)
        .split("\n")
        .slice(0, 6)
}

function place(root: Node, path: string[], result: Result) {
    let node = root
    for (const label of path) {
        let child = node.children.get(label)
        if (child === undefined) {
            child = { label, children: new Map(), results: [] }
            node.children.set(label, child)
        }
        node = child
    }
    node.results.push(result)
}

const everything = (node: Node): Result[] => [...node.results, ...[...node.children.values()].flatMap(everything)]

function statusOf(results: Result[]): Status {
    if (results.some((r) => r.status === "failed")) return "failed"
    return results.some((r) => r.status === "passed") ? "passed" : "skipped"
}

const mark = (status: Status) => (status === "failed" ? red("✖") : status === "passed" ? green("✔") : dim("○"))

function counts(results: Result[]): string {
    const n = (s: Status) => results.filter((r) => r.status === s).length
    return [
        n("failed") > 0 ? red(`${n("failed")} failed`) : "",
        n("passed") > 0 ? `${n("passed")} passed` : "",
        n("skipped") > 0 ? dim(`${n("skipped")} skipped`) : "",
    ]
        .filter(Boolean)
        .join(dim(" · "))
}

function* render(node: Node, prefix: string, last: boolean, top: boolean): Generator<string> {
    const children = [...node.children.values()].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { numeric: true }),
    )
    const branch = top ? "" : last ? "└─ " : "├─ "
    const results = everything(node)
    const label = top ? bold(node.label) : node.label
    yield `${prefix}${branch}${mark(statusOf(results))} ${label}${children.length === 0 ? `  ${counts(results)}` : ""}\n`

    const childPrefix = prefix + (top ? "" : last ? "   " : "│  ")
    for (const [i, child] of children.entries()) yield* render(child, childPrefix, i === children.length - 1, false)
    for (const failure of node.results.filter((r) => r.status === "failed")) {
        yield `${childPrefix}   ${red("✖")} ${failure.label}\n`
        for (const line of failure.detail) yield `${childPrefix}       ${dim(line)}\n`
    }
}

export default async function* reporter(source: AsyncIterable<TestEvent>) {
    const root: Node = { label: "", children: new Map(), results: [] }
    const names: string[] = []

    for await (const { type, data } of source) {
        if (type === "test:start") {
            names[data["nesting"]] = data["name"]
            names.length = data["nesting"] + 1
            continue
        }
        if ((type !== "test:pass" && type !== "test:fail") || data["details"]?.type === "suite") continue

        const file = relative(process.cwd(), String(data["file"] ?? "unknown"))
        const contexts = names.slice(0, data["nesting"])
        const leaf = String(data["name"])
        const status: Status =
            type === "test:fail"
                ? "failed"
                : data["skip"] !== undefined || data["todo"] !== undefined
                  ? "skipped"
                  : "passed"

        // "part 1: (()) -> 0" under "2015 day 01: examples" reads as "examples › (()) -> 0" inside a Part 1 node.
        const context = contexts.at(-1)?.replace(/^\d{4} day \d+:\s*/i, "")
        const caseName = leaf.replace(/^part\s*[12]:?\s*/i, "")
        const result: Result = {
            status,
            label: [context, caseName].filter(Boolean).join(" › "),
            detail: status === "failed" ? describeFailure(data["details"]?.error) : [],
        }

        const day = /src\/(\d{4})\/day(\d{2})\//.exec(file)
        if (day) {
            const part = partPattern.exec(leaf) ?? contexts.map((c) => partPattern.exec(c)).find(Boolean)
            place(root, [day[1]!, `Day ${day[2]}`, part ? `Part ${part[1]}` : "Other tests"], result)
        } else {
            const folder = dirname(file).replace(/^src\/?/, "") || "src"
            place(root, [folder, basename(file).replace(/\.test\.[cm]?[jt]s$/, "")], {
                ...result,
                label: result.label || leaf,
            })
        }
    }

    const groups = [...root.children.values()].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { numeric: true }),
    )
    yield "\n"
    for (const group of groups) {
        yield* render(group, "", true, true)
        yield "\n"
    }

    const all = everything(root)
    const total = counts(all)
    yield `${total}\n\n`
}
