let scores = [3, 1, 2, 12, 10, 6]

let mapResult = scores.map((score, index) => {
    console.log(index, score);
    return score * 2
})



console.log(mapResult); // [6, 1, 4, ..., 12]