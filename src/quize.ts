
const quizes = [
    {
        "q": "Which one is used to yank (copy) a line ?",
        "opt1": "yy",
        "opt2": "cp",  
        "ans": "yy"
    },
    {
        "q": "Which one is used to move the cursor to the left?",
        "opt1": "l",
        "opt2": "h",  
        "ans": "h"
    },
    {
        "q": "Which one is used to insert (append) after the cursor?",
        "opt1": "o",
        "opt2": "a",  
        "ans": "a"
    },
    {
        "q": "Which one is used to change (replace) entire word?",
        "opt1": "ciw",
        "opt2": "cc",  
        "ans": "ciw"
    }
];

export interface Quize {
    q: string, 
    opt1: string, 
    opt2: string,
    ans: string
}
 
export const selectRandomQuize = (): Quize => {
    const rand = Math.floor(Math.random() * quizes.length);
    return quizes[rand];
};
