<template>
    <div class="wrapper">
        <h1>Jeu du Pendu</h1>
        <div class="newgame">
            <a href="/">
                <p>New Game</p>
            </a>
        </div>
        <div class="box-info">
            <div class="box-pendu">
                <img
                    v-if="error"
                    :src="require(`../assets/${error}.png`)"
                    alt="image pendu"
                    width="200"
                    height="200"
                    class="rotate-scale-up"
                />
            </div>

            <div class="box-info-succes" v-if="looseCondition === true">
                <p style="color: white">
                    Le mot a trouver été :
                    <span class="word">{{ word }}</span>
                </p>
            </div>
            <div class="box-info-succes" v-if="winCondition === true">
                <p style="color: white">Bravo vous avez gagné !</p>
            </div>
        </div>
        <div class="box-hidden-word">
            <div v-for="letter in hiddenWord" :key="letter.index">
                <p
                    v-if="hiddenWord"
                    class="animate__animated animate__backInDown"
                >
                    {{ letter }}
                </p>
            </div>
        </div>
        <div class="box-second">
            <!-- 9 erreurs maximum -->
            <div class="box-use-letter">
                <div
                    v-for="elem in useLetter"
                    :key="elem.index"
                    class="use-letter"
                >
                    <p class="animate__animated animate__bounce">{{ elem }}</p>
                </div>
            </div>
            <div
                class="animate__animated animate__backInUp"
                v-if="newGame == true"
            >
                <div class="box-letter">
                    <div
                        class="box-alphabet"
                        v-for="letter in alphabet"
                        :key="letter.index"
                    >
                        <button
                            class="button-59"
                            :value="`${letter}`"
                            @click="letterChoose"
                            :disabled="!isActive"
                        >
                            {{ letter }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mots } from "../assets/mots";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            alphabet: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
            ],
            show: true,
            chooseLetter: [],
            displayLetter: [],
            useLetter: [],
            findLetter: [],
            isActive: true,
            message: "",
            word: "",
            hiddenWord: "",
            error: 0,
            looseCondition: false,
            winCondition: false,
            imgError: "",
            newGame: false,
        };
    },
    computed: {},

    mounted() {
        let rand = Math.floor(Math.random() * mots.length);
        let rValue = mots[rand];
        this.word = rValue.toUpperCase();

        let nbLetter = rValue.length;

        const hidden_word = this.word
            .toUpperCase()
            .slice()
            .replace(/[A-Z0-9]/g, "_");

        const findWord = hidden_word.split("");

        this.hiddenWord = findWord;

        console.log(this.hiddenWord);

        this.newGame = true;
        this.useLetter = [];
        this.error = 0;
        this.looseCondition = false;
        this.winCondition = false;
        this.isActive = true;
    },
    methods: {
        letterChoose(e) {
            this.chooseLetter.push(e.target.value);

            for (let i = 0; this.chooseLetter[i]; i++) {
                this.displayLetter = this.chooseLetter[i];
            }
            this.useLetter.push(this.displayLetter);
            // console.log(this.useLetter);
            let index = this.alphabet.indexOf(e.target.value);
            // console.log(index);
            if (index > -1) {
                this.alphabet.splice(index, 1);
            }
            // Vérification si lettre existe dans le mot random
            if (this.word.includes(e.target.value)) {
                // find index et remplacer le _ par la lettre trouvé

                this.word.split("").forEach((letter, index) => {
                    if (letter === e.target.value) {
                        this.hiddenWord[index] = e.target.value;
                        this.findLetter.push(this.hiddenWord[index]);
                        console.log(this.findLetter.length);
                    }
                });
            } else {
                this.error++;
                // console.log(this.error);
            }

            // Condtion de victoire
            if (this.findLetter.length === this.word.length) {
                this.winCondition = true;
                this.isActive = false;
            }
            // Condition defaite
            if (this.error === 10) {
                this.looseCondition = true;
            }
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Orbitron:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Orbitron:wght@700&display=swap");
.wrapper {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
h1 {
    color: white;
    text-align: center;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    text-shadow: #000 1px 0 10px;
}

/* Button start*/

.newgame {
    display: flex;
    justify-content: center;

    width: 250px;
}

.newgame a,
a:visited {
    text-decoration: none;

    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    color: white;
}

/*Partie haute*/

.box-info {
    display: flex;
    justify-content: space-around;
}

.box-pendu {
    width: 300px;
    height: 200px;
}
.rotate-scale-up {
    -webkit-animation: rotate-scale-up 0.65s linear both;
    animation: rotate-scale-up 0.65s linear both;
}

@-webkit-keyframes rotate-scale-up {
    0% {
        -webkit-transform: scale(1) rotateZ(0);
        transform: scale(1) rotateZ(0);
    }
    50% {
        -webkit-transform: scale(2) rotateZ(180deg);
        transform: scale(2) rotateZ(180deg);
    }
    100% {
        -webkit-transform: scale(1) rotateZ(360deg);
        transform: scale(1) rotateZ(360deg);
    }
}
@keyframes rotate-scale-up {
    0% {
        -webkit-transform: scale(1) rotateZ(0);
        transform: scale(1) rotateZ(0);
    }
    50% {
        -webkit-transform: scale(2) rotateZ(180deg);
        transform: scale(2) rotateZ(180deg);
    }
    100% {
        -webkit-transform: scale(1) rotateZ(360deg);
        transform: scale(1) rotateZ(360deg);
    }
}

.box-info-succes {
    width: 54%;
    height: 200px;
    font-family: "Orbitron", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 5s;
}
.word {
    color: white;
    font-family: "Orbitron", sans-serif;
    font-size: 27px;
}

.box-hidden-word {
    display: flex;
    justify-content: space-evenly;
    color: white;
    font-size: 35px;
    width: 100%;
}

/* Partie basse*/

.use-letter {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Orbitron", sans-serif;
    font-size: 25px;
    color: #e5e5e5;
}
.box-second {
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.box-use-letter {
    background: #fca311;
    border: white solid 4px;
    height: 35px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.box-letter {
    background: #f1c47b;
    border: white solid 4px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
    height: 243px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
}

.button-59 {
    align-items: center;
    background-color: #fff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    cursor: pointer;
    display: inline-flex;
    fill: #000;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 600;
    height: 45px;
    width: 45px;
    justify-content: center;

    line-height: 24px;

    outline: 0;

    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-59:focus {
    color: #171e29;
}

.button-59:hover {
    border-color: #06f;
    color: #06f;
    fill: #06f;
}

.button-59:active {
    border-color: #06f;
    color: #06f;
    fill: #06f;
}
</style>
