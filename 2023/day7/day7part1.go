package main

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)


type Hand struct {
	Bet int
	Cards []Card
	Score HandValue 
}

type Card int
const (
	Two Card = iota + 1
	Three
	Four
	Five
	Six
	Seven
	Eight
	Nine
	Ten
	Jack
	Queen
	King
	Ace
)

type HandValue int

const (
	HIGH_CARD HandValue = iota
	PAIR
	TWO_PAIR
	THREE_OF_KIND
	FULL_HOUSE
	FOUR_OF_KIND
	FIVE_OF_KIND
)

func main() {
	var hands []Hand
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		hand := populateHand(line)
		hands = append(hands, hand)
	}

	slices.SortFunc(hands, func(a, b Hand) int {
		x := a.Score - b.Score
		if x != 0 {
			return int(x)
		}

		for i, card := range a.Cards {
			v := int(card) - int(b.Cards[i]) 
			if (v != 0) {
				return v
			}
		}

		return int(x)
	})


	totalWinnings := 0
	for i, hand := range hands {
		totalWinnings += (i+1) * hand.Bet
	}
	fmt.Printf("Total winnings: %d\n", totalWinnings)
}



func populateHand(line string) Hand {
	var hand Hand;			
	handAndBet := strings.Split(line, " ")
	hand.Bet, _ = strconv.Atoi(handAndBet[1])
	hand.Cards = translateStringToCards(handAndBet[0])
	hand.Score = scoreHand(hand.Cards)
	return hand

}

func translateStringToCards(line string) []Card {
	hand := make([]Card, len(line))

	for i, aRune := range []rune(line) {
		hand[i] = translateToCardValue(aRune)
	}

	return hand
}

func translateToCardValue(cardRune rune) Card {
	switch cardRune {
		case '2': return Two
		case '3': return Three
		case '4': return Four
		case '5': return Five
		case '6': return Six
		case '7': return Seven
		case '8': return Eight
		case '9': return Nine
		case 'T': return Ten
		case 'J': return Jack
		case 'Q': return Queen
		case 'K': return King
		case 'A': return Ace
	}
	fmt.Println("Value:", string(cardRune), "!")
	panic("Not found")
}


func scoreHand(hand []Card) HandValue {
 	counts := make([]int, 14)
	for _, card := range hand {
		counts[int(card)] += 1
	}


	slices.SortFunc(counts, func(a, b int) int {
		return b - a 
	})

	if counts[0] == 5 {
		return FIVE_OF_KIND
	} else if counts[0] == 4 {
		return FOUR_OF_KIND
	} else if counts[0] == 3 && counts[1] == 2 {
		return FULL_HOUSE
	} else if counts[0] == 3 {
		return THREE_OF_KIND
	} else if counts[0] == 2 && counts[1] == 2 {
		return TWO_PAIR
	} else if counts[0] == 2 {
		return PAIR
	} else {
		return HIGH_CARD
	}
}

