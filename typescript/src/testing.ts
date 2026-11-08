import type {TestContext} from "node:test"

/**
 * Wraps a puzzle test body: a part that still throws "not implemented" is reported as skipped instead of failing,
 * so unfinished parts don't turn finished ones (or the whole run) red.
 */
export function pending(body: () => unknown): (t: TestContext) => Promise<void> {
    return async (t) => {
        try {
            await body()
        } catch (error) {
            if (error instanceof Error && /^not implemented$/i.test(error.message)) {
                t.skip("not implemented")
                return
            }
            throw error
        }
    }
}
