import moment from "moment"

export const analyze = (text) => {
    if (text.includes('hi') || text.includes('hai') || text.includes('hello'))
        return "Hi, how can i help you?"
    else if (text.includes('date'))
        return moment().format('MMMM Do yyyy')
    else if (text.includes('time'))
        return moment().format('h:mm:ss a')
    else if (text.includes('google link'))
        return 'https://www.google.com'
    else if (text.includes('nikil'))
        return "nikil is a playboy"
    else if (text.includes('thank you'))
        return "Thank You for messaging me"
    return "I can't get you. can you rephrase the message"
}