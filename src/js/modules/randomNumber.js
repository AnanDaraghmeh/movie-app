function randomNumberGenerator(min, max){
    let randomNum = Math.random() * (max-min) + min;
    return Math.floor(randomNum);
}
function randomArrayItem (arr){
    return arr[randomNumberGenerator(0, arr.length-1)];
}

export {randomNumberGenerator, randomArrayItem};