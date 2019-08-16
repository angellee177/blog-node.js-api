function braces(values){
    if(values.length <= 1)
        return false
    
        let matchingOpeningBracket, ch
        let stack = []

        let openingBrackets = ['[', '{', '(']
        let closingBrackets = [']', '}', ')']

        for (let i = 0; i < values.length; i ++){
            ch = values[i]

            if(closingBrackets.indexOf(ch) > -1){
                matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(ch)]
                if(stack.length == 0 || (stack.pop() != matchingOpeningBracket)){
                    return ("NO")
                } else {
                    return ("YES")
                }

            } else {
                stack.push(ch)
            }
        }

        return (stack.length == 0)
    };

    console.log(braces(2))
    console.log(braces("{}[]()"))
    console.log(braces("{[}]}"))


    function getBeautifulDayCount(i, j, k) {
        var result = 0;
        for (var num = i; num <= j; num++) {
            var b = reverseInt(x)
            var a = Math.abs(x - b) / k
            if (a % i == 0) {
                result++;
            }
        }
        return result;
    }