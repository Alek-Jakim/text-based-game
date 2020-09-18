const textEl = document.getElementById('text');
const optionButtonsEl = document.getElementById('option-buttons');


let state = {}


function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(node => node.id === textNodeIndex);
    textEl.innerText = textNode.text
    while (optionButtonsEl.firstChild) {
        optionButtonsEl.removeChild(optionButtonsEl.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsEl.appendChild(button);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}







const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a magic mushroom the size of a dog.',
        options: [
            {
                text: 'Take the mushroom',
                setState: { mushroom: true },
                nextText: 2
            },
            {
                text: 'Leave the mushroom',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of destiny when you come across a trader.',
        options: [
            {
                text: 'Trade the mushroom for a sword',
                requiredState: (currentState) => currentState.mushroom,
                setState: { mushroom: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the mushroom for a shield',
                requiredState: (currentState) => currentState.mushroom,
                setState: { blueGoo: false, shield: true },
                nextText: 3
            },
            {
                text: 'Ignore the trader',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the trader you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by Lamia, the terrible monster.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across Lamia standing in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack her with your sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind your shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Throw the mushroom at her',
                requiredState: (currentState) => currentState.mushroom,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and Lamia devours you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You foolishly thought Lamia could be slain with a single sword.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'Lamia laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You threw your mushroom at Lamia and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    }
]


startGame();

