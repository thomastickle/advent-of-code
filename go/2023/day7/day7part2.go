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
	Joker = 0	
	Two Card = iota + 1
	Three
	Four
	Five
	Six
	Seven
	Eight
	Nine
	Ten
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
		case 'J': return Joker
		case 'Q': return Queen
		case 'K': return King
		case 'A': return Ace
	}
	panic("Not found")
}


func scoreHand(hand []Card) HandValue {
 	counts := make([]int, 14)
	for _, card := range hand {
		counts[int(card)] += 1
	}
	
	jokers := counts[0]
	counts = counts[1:]

	slices.SortFunc(counts, func(a, b int) int {
		return b - a 
	})

	
	// Now figure out winning combinations
	if counts[0] + jokers == 5 {
		return FIVE_OF_KIND
	} 

	if counts[0] + jokers == 4 {
		return FOUR_OF_KIND
	} 


	// Get the two highest counts so we can try to make the best hand using jokers.
	most := counts[0]
	second := counts[1]

	for most < 3 && jokers > 0 {
		most++
		jokers--
	}

	for second < 2 && jokers > 0 {
		most++
		jokers--
	}

	if most == 3 && second == 2 {
		return FULL_HOUSE
	} 

	if most == 3 {
		return THREE_OF_KIND
	} 

	if most == 2 && second == 2 {
		return TWO_PAIR
	} 

	if most == 2 {
		return PAIR
	}

	return HIGH_CARD
}
