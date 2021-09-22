# Contributing

- [Report an Error or Bug](#Report-an-Error-or-Bug)
- [Request a Feature](#Report-a-Feature)
- [Contribute code](#Contribute-code)
- [Creating message contexts for the chat system](Creating-message-contexts-for-the-chat-system)

---

## Report an Error or Bug

If you run into an error or bug with the project:

* Open an Issue at [here](https://github.com/Weslley-Borges/Lara/issues).
* Include *reproduction steps* that someone else can follow to recreate the bug or error on their own.


## Request a Feature

If the project doesn't do something you need or want it to do:

* Open an Issue at [here](https://github.com/Weslley-Borges/Lara/issues)
* Provide as much context as you can about what you're running into.
* Please try and be clear about why existing features and alternatives would not work for you.

----

## Contribute code

We really like code commits! They are very helpful and keep the project going and doing the work it needs to be useful to others. We consider as a good source [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) from Chris Beams.

Code contributions of virtually any size are acceptable!
To contribute the code:

- [Configure the project](setup.md).
- Make the necessary changes to the source code.
- Write tests that verify that your contribution works as expected.
- Go to https://github.com/Weslley-Borges/Lara/pulls and open a new pull request with your changes.
- If your PR is connected to an open issue, add a line in your PR description that says `Fixes: #123`, where` #123` is the number of the issue you are fixing.

## Creating message contexts for the chat system
Here we have an example context:
````
[
  {
    "context": "Oi",
    "responses": [
      "Olá!",
      "Oi!",
      "Eae, tudo em cima?",
      "👋"
    ],
    "pos_responses": [
      "O que você está fazendo?",
      "Bora dar o nosso melhor hoje!"
    ]
  }
]
```` 
How to contribute:
- Create one or several of these contexts (have fun),
- Open a new Issue with these contexts, maintainers will review them