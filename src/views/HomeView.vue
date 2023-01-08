<template>
    <div class="wrapper">
        <h1>Bienvenue sur le jeu du Pendu</h1>
        <div class="buttons">
            <button class="btn" @click="newgame">
                <span></span>
                <p data-text="start!" data-title="new game"></p>
            </button>
        </div>
        <div class="box-info">
            <div class="box-pendu"><h1>box pendu</h1></div>
            <div class="box-info-succes" v-if="message">{{ message }}</div>
            <p v-if="word">{{ word }}</p>
        </div>
        <p v-if="wordChoose">{{ wordChoose }}</p>
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
            <div class="box-letter">
                <div
                    class="box-alphabet"
                    v-for="letter in alphabet"
                    :key="letter.index"
                >
                    <button
                        class="button-59"
                        :value="`${letter}`"
                        @click="choose"
                        :disabled="!isActive"
                    >
                        {{ letter }}
                    </button>
                </div>
            </div>
        </div>

        <p>{{ check }}</p>
    </div>
</template>

<script>
// @ is an alias to /src
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
            isActive: true,
            message: "",
            word: "",
            lengthWord: "",
            wordChoose: "",
            check: "",
        };
    },
    computed: {},
    methods: {
        choose(e) {
            // console.log(e.target.value);
            this.chooseLetter.push(e.target.value);

            // console.log(typeof this.chooseLetter);
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
            if (this.useLetter.length == 10) {
                this.message = "Vous avez perdu";
                this.isActive = false;
            }

            // Vérification si lettre existe dans le mot random
            if (this.word.includes(e.target.value)) {
                // find index et remplacer le _ par la lettre trouvé

                this.word.split("").forEach((letter, index) => {
                    if (letter === e.target.value) {
                        this.wordChoose[index] = e.target.value;
                    }
                });
            } else {
                console.log("non");
            }
        },
        newgame() {
            let rand = Math.floor(Math.random() * mots.length);
            let rValue = mots[rand];
            this.word = rValue.toUpperCase();

            let nbLetter = rValue.length;

            const hidden_word = this.word
                .toUpperCase()
                .slice()
                .replace(/[A-Z0-9]/g, "_");

            const findWord = hidden_word.split("");

            this.wordChoose = findWord;

            console.log(this.wordChoose);

            this.useLetter = [];
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Orbitron:wght@700&display=swap");
.wrapper {
    height: 844px;
    background: blueviolet;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

/* Button start*/

.buttons {
    display: flex;
    justify-content: space-around;
    top: 20px;
    left: 20px;
}

.buttons button {
    width: 150px;
    height: 50px;
    background-color: white;
    margin: 20px;
    color: #568fa6;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
}

.buttons button:before,
.buttons button:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #44d8a4;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
}

.buttons button:before {
    right: 0;
    top: 0;
    transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
}

.buttons button:after {
    left: 0;
    bottom: 0;
}

.buttons button span {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
}

.buttons button span:before,
.buttons button span:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 0;
    background-color: #44d8a4;
    transition: all 0.3s cubic-bezier(0.35, 0.1, 0.25, 1);
}

.buttons button span:before {
    right: 0;
    top: 0;
    transition: all 0.5s cubic-bezier(0.35, 0.1, 0.25, 1);
}

.buttons button span:after {
    left: 0;
    bottom: 0;
}

.buttons button p {
    padding: 0;
    margin: 0;
    transition: all 0.4s cubic-bezier(0.35, 0.1, 0.25, 1);
    position: absolute;
    width: 100%;
    height: 100%;
}

.buttons button p:before,
.buttons button p:after {
    position: absolute;
    width: 100%;
    transition: all 0.4s cubic-bezier(0.35, 0.1, 0.25, 1);
    z-index: 1;
    left: 0;
}

.buttons button p:before {
    content: attr(data-title);
    top: 50%;
    transform: translateY(-50%);
}

.buttons button p:after {
    content: attr(data-text);
    top: 150%;
    color: #44d8a4;
}

.buttons button:hover:before,
.buttons button:hover:after {
    width: 100%;
}

.buttons button:hover span {
    z-index: 1;
}

.buttons button:hover span:before,
.buttons button:hover span:after {
    height: 100%;
}

.buttons button:hover p:before {
    top: -50%;
    transform: rotate(5deg);
}

.buttons button:hover p:after {
    top: 50%;
    transform: translateY(-50%);
}

.buttons button.start {
    background-color: #44d8a4;
    box-shadow: 0px 5px 10px -10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
}

.buttons button.start p:before {
    top: -50%;
    transform: rotate(5deg);
}

.buttons button.start p:after {
    color: white;
    transition: all 0s ease;
    content: attr(data-start);
    top: 50%;
    transform: translateY(-50%);
    animation: start 0.3s ease;
    animation-fill-mode: forwards;
}

@keyframes start {
    from {
        top: -50%;
    }
}

.buttons button.start:hover:before,
.buttons button.start:hover:after {
    display: none;
}

.buttons button.start:hover span {
    display: none;
}

.buttons button:active {
    outline: none;
    border: none;
}

.buttons button:focus {
    outline: 0;
}

/*Partie haute*/

.box-info {
    display: flex;
    justify-content: space-around;
}
.box-pendu {
    width: 60%;
    height: 200px;
    background-color: blue;
}
.box-info-succes {
    width: 35%;
    height: 200px;
    background-color: green;
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
}
.box-second {
    background: orange;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.box-use-letter {
    background: yellow;
    height: 35px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.box-letter {
    background: blue;
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
