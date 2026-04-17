#!/bin/bash

COUNT=${1:-27}

# FizzBuzz
for ((i=1; i<=COUNT; i++)); do
	OUTPUT=""
	
	# Check if divisible by 3
	if (( i % 3 == 0 )); then
		OUTPUT+="Fizz"
	fi

	# Check if divisible by 5
	if (( i % 5 == 0 )); then
		OUTPUT+="Buzz"
	fi

	if [[ -z "$OUTPUT" ]]; then
		echo $i
	else
		echo "$OUTPUT"
	fi
done