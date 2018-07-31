# वार्ता (vaarta)

Conversation effect over typing effect by [शब्दावली (shabdawali)](http://amitkumargupta.work/shabdawali/)

<div align="center"><img src="static/vaarta.gif"></div>

## How to use

```JavaScript
var vaarta  = new Vaarta({
    repeat : true
});

vaarta.add("Husband", document.getElementById("amit"), {
    typoEffect: true,
    deleteEffect : false,
});
vaarta.add("Wife", document.getElementById("nushi") , {
    deleteEffect : false,
});

vaarta.and("Husband", "Wow! this smell is ... making me hungry")
            .and("Wife", "Wait!!", 100)
            .speak("Wife", "I said wait. You can't eat..", 3200)
            .and("Husband", "but .. ", 300)
            .and("Wife", "let's the guests take first", 300)
            .speak("Husband", "come on!!", 2500)
            .speak("Husband", "I'm just tasting if they're cooked well", 1000)
            .and("Wife", "I cooked them", 0)

vaarta.start();
```