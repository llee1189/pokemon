import React, { useState, useEffect, useRef } from "react";
import './Game.css';
import { Pokemon, WildMusic, CheckMirageIsland, CheckLocation, RandomPokemon, getDescription} from "./Pokemon.js"
import {useCookies} from 'react-cookie'


import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';


export const Game = () => {
    const timeFlash = 200;
    const navigate = useNavigate()
    const log = useLocation();

    const [cookies, setCookie] = useCookies(['musicVolume', 'soundVolume']);
    const [isGuest, setIsGuest] = useState(false);
    const [musicVolume, setMusicVolume] = useState(.5);
    const [soundVolume, setSoundVolume] = useState(.5);
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("username");
    const [randomPokemon, setRandomPokemon] = useState([]);
    const [encountering, setEncountering] = useState(false);
    const [blackFlash, setBlackFlash] = useState("black-flash-opaque");
    const [grass, setGrass] = useState(false);
    const [pokemonGrassPosition, setPokemonGrassPosition] = useState("pokemon-grass-tile-origin")
    const [playerGrassPosition, setPlayerGrassPosition] = useState("player-grass-tile-origin")
    const [encounterPokemonPosition, setEncounterPokemonPosition] = useState("encounter-pokemon-origin")
    const [showEncounterMenu, setShowEncounterMenu] = useState(false)
    const [pokeballID, setPokeballID] = useState("pokeball-throw-start")
    const [encounterTextBool, setEncounterTextBool] = useState(false)
    const [encounterText, setEncounterText] = useState("")
    const [encounteredPokemon, setEncounterPokemon] = useState("random")
    const [showReturn, setShowReturn] = useState(false)
    const [miragePokemon, setMiragePokemon] = useState("")
    const [showMirageError, setShowMirageError] = useState(false)
    const [invalidLocation, setInvalidLocation] = useState(false)
    const [showPokedex, setShowPokedex] = useState(false)
    const [pokedexPage, setPokedexPage] = useState(-1)
    const [pokedexPokemon, setPokedexPokemon] = useState("")
    const [pokedexCaught, setPokedexCaught] = useState(false)

    const checkCaughtPokemon = (p) => {
            Axios.post("http://localhost:3001/check-caught-pokemon", {
                username: username,
                pokemon: p
              }).then((response) => {
                return
                if (response.data[0].caught == undefined) {
                    setPokedexCaught(false)
                } else if (response.data[0].caught == 1) {
                    setPokedexCaught(true)
                }

            })
        
    }

    const registerCaughtPokemon = (p) => {
        Axios.post("http://localhost:3001/caught-pokemon", {
            username: username,
            pokemon: p
          }).then((response) => {
            return
        })
    }

    const seenEncounterPokemon = (p, id) => {
        Axios.post("http://localhost:3001/seen-pokemon", {
            username: username,
            pokemon: p
          }).then((response) => {
            if (response.data == "SEEN") {
                document.getElementById(id).className = "pokedex-pokemon"
            } else if (response.data == "NOT SEEN") {
                document.getElementById(id).className = "pokedex-pokemon-undiscovered"
            }
        })
    }

    const seenPokedexPokemon = (p) => {
        Axios.post("http://localhost:3001/seen-pokemon", {
            username: username,
            pokemon: p
          }).then((response) => {
            if (response.data == "SEEN") {
                document.getElementById(p + "-id").className = "pokedex-pokemon"
            } else if (response.data == "NOT SEEN") {
                document.getElementById(p + "-id").className = "pokedex-pokemon-undiscovered"
            }
        })
    }

    const dbPokemon = (e) => {
        Axios.post("http://localhost:3001/db-pokemon", {
          username: username,
          pokemon: e
        }).then((response) => {
        })
      }

    const getPokedex = (i) => {
        let pokedex = [
            "treecko",
            "grovyle",
            "sceptile",
            "torchic",
            "combusken",
            "blaziken",
            "mudkip",
            "marshtomp",
            "swampert",
            "poochyena",
            "mightyena",
            "zigzagoon",
            "linoone",
            "wurmple",
            "silcoon",
            "beautifly",
            "cascoon",
            "dustox",
            "lotad",
            "lombre",
            "ludicolo",
            "seedot",
            "nuzleaf",
            "shiftry",
            "taillow",
            "swellow",
            "wingull",
            "pelipper",
            "ralts",
            "kirlia",
            "gardevoir",
            "surskit",
            "masquerain",
            "shroomish",
            "breloom",
            "slakoth",
            "vigoroth",
            "slaking",
            "abra",
            "kadabra",
            "alakazam",
            "nincada",
            "ninjask",
            "shedinja",
            "whismur",
            "loudred",
            "exploud",
            "makuhita",
            "hariyama",
            "goldeen",
            "seaking",
            "magikarp",
            "gyarados",
            "azurill",
            "marill",
            "azumarill",
            "geodude",
            "graveler",
            "golem",
            "nosepass",
            "skitty",
            "delcatty",
            "zubat",
            "golbat",
            "crobat",
            "tentacool",
            "tentacruel",
            "sableye",
            "mawile",
            "aron",
            "lairon",
            "aggron",
            "machop",
            "machoke",
            "machamp",
            "meditite",
            "medicham",
            "electrike",
            "manectric",
            "plusle",
            "minun",
            "magnemite",
            "magneton",
            "voltorb",
            "electrode",
            "volbeat",
            "illumise",
            "oddish",
            "gloom",
            "vileplume",
            "bellossom",
            "doduo",
            "dodrio",
            "roselia",
            "gulpin",
            "swalot",
            "carvanha",
            "sharpedo",
            "wailmer",
            "wailord",
            "numel",
            "camerupt",
            "slugma",
            "magcargo",
            "torkoal",
            "grimer",
            "muk",
            "koffing",
            "weezing",
            "spoink",
            "grumpig",
            "sandshrew",
            "sandslash",
            "spinda",
            "skarmory",
            "trapinch",
            "vibrava",
            "flygon",
            "cacnea",
            "cacturne",
            "swablu",
            "altaria",
            "zangoose",
            "seviper",
            "lunatone",
            "solrock",
            "barboach",
            "whiscash",
            "corphish",
            "crawdaunt",
            "baltoy",
            "claydol",
            "lileep",
            "cradily",
            "anorith",
            "armaldo",
            "igglybuff",
            "jigglypuff",
            "wigglytuff",
            "feebas",
            "milotic",
            "castform",
            "staryu",
            "starmie",
            "kecleon",
            "shuppet",
            "banette",
            "duskull",
            "dusclops",
            "tropius",
            "chimecho",
            "absol",
            "vulpix",
            "ninetales",
            "pichu",
            "pikachu",
            "raichu",
            "psyduck",
            "golduck",
            "wynaut",
            "wobbuffet",
            "natu",
            "xatu",
            "girafarig",
            "phanpy",
            "donphan",
            "pinsir",
            "heracross",
            "rhyhorn",
            "rhydon",
            "snorunt",
            "glalie",
            "spheal",
            "sealeo",
            "walrein",
            "clamperl",
            "huntail",
            "gorebyss",
            "relicanth",
            "corsola",
            "chinchou",
            "lanturn",
            "luvdisc",
            "horsea",
            "seadra",
            "kingdra",
            "bagon",
            "shelgon",
            "salamence",
            "beldum",
            "metang",
            "metagross",
            "regirock",
            "regice",
            "registeel",
            "latias",
            "latios",
            "kyogre",
            "groudon",
            "rayquaza",
            "jirachi",
            "deoxys"]
        let count = i * 18;
        var temp = []
        for (let i = 0; i < 6; i++) {
            let t = <div className="pokeflex">
                <div className="pokegrid"><img onLoad={seenPokedexPokemon(pokedex[count])} className="pokedex-pokemon-undiscovered" id={pokedex[count]+ "-id"} alt={pokedex[count]} src={"https://img.pokemondb.net/sprites/black-white/normal/" + pokedex[count] + ".png"} onError={(e) => {e.target.src = require("./pokemon gif/blank.png")}} onClick={(e)=>{if(e.target.className != "pokedex-pokemon") {return}setPokedexPokemon(e.target.alt); document.getElementById('sound-audio').src = ("https://play.pokemonshowdown.com/audio/cries/" + e.target.alt + ".ogg"); document.getElementById('sound-audio').play()}}/></div>
                <div className="pokegrid"><img onLoad={seenPokedexPokemon(pokedex[count + 1])} className="pokedex-pokemon-undiscovered" id={pokedex[count + 1]+ "-id"} alt={pokedex[count + 1]} src={"https://img.pokemondb.net/sprites/black-white/normal/" + pokedex[count + 1] + ".png"} onError={(e) => {e.target.src = require("./pokemon gif/blank.png")}} onClick={(e)=>{if(e.target.className != "pokedex-pokemon") {return}setPokedexPokemon(e.target.alt); document.getElementById('sound-audio').src = ("https://play.pokemonshowdown.com/audio/cries/" + e.target.alt + ".ogg"); document.getElementById('sound-audio').play()}}/></div>
                <div className="pokegrid"><img  onLoad={seenPokedexPokemon(pokedex[count + 2])} className="pokedex-pokemon-undiscovered" id={pokedex[count + 2]+ "-id"} alt={pokedex[count + 2]} src={"https://img.pokemondb.net/sprites/black-white/normal/" + pokedex[count + 2] + ".png"} onError={(e) => {e.target.src = require("./pokemon gif/blank.png")}} onClick={(e)=>{if(e.target.className != "pokedex-pokemon") {return}setPokedexPokemon(e.target.alt); document.getElementById('sound-audio').src = ("https://play.pokemonshowdown.com/audio/cries/" + e.target.alt + ".ogg"); document.getElementById('sound-audio').play() }}/></div>
            </div>
            temp.push(t)
            count = count + 3;
        }
        return temp
    }

    const Pokdexing = (e) => {
        setPokedexPage(0)
        setBlackFlash("black-flash-opaque")

        setEncountering(true)
        setTimeout(() => {
            setBlackFlash("black-flash-transparent")
            setShowPokedex(true)
        }, 500);
        setTimeout(() => {
            setBlackFlash("black-flash-transparent-gone")
        }, 1000)
    }

    const selectPokemon = (e) => {
        let pokemonArray = [Pokemon(location)]
        pokemonArray = [...pokemonArray, Pokemon(location)]
        pokemonArray = [...pokemonArray, Pokemon(location)]
        setRandomPokemon(pokemonArray)
    }

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } {
            if (CheckLocation(location) != undefined) {
                setInvalidLocation(true)
            } else {
                setInvalidLocation(false)
            }
            if (location == "Mirage Island") {
                return
            }
            selectPokemon();
        }
    }, [location])

    useEffect(() => {
        if (log.state == null) {
            // navigate("/")
        } else {
            playMenuMusic()
            if (log.state.guest == true) {
                setIsGuest(true)
                setUsername("Welcome Guest!")
            } else {
                setUsername(log.state.username)
            }
        }
    }, [])

    useEffect(() => {
        checkCaughtPokemon(pokedexPokemon)
    }, [pokedexPokemon])

    const encounter = (e) => {
        let choice = Math.floor(Math.random() * 3)
        let mainPokemon;
        if (e.target.className == 'pokemon-luck-button') {
            let temp = RandomPokemon()
            setEncounterPokemon(temp)
            mainPokemon = temp
        } else if (location == "Mirage Island") {
            setEncounterPokemon(miragePokemon)
            mainPokemon = miragePokemon;
            if (CheckMirageIsland(miragePokemon) == undefined) {
                setShowMirageError(true)
                return
            }
        } else {
            setEncounterPokemon(randomPokemon[choice])
            mainPokemon = randomPokemon[choice]
        }

        let temp = WildMusic().split("$")
        document.getElementById('music-audio').src = temp[0]
        document.getElementById('music-audio').currentTime = temp[1];
        document.getElementById('music-audio').play()
        setEncountering(true)
        setBlackFlash("black-flash-opaque")
        setTimeout(function () { setBlackFlash("black-flash-transparent") }, timeFlash)
        setTimeout(function () { setBlackFlash("black-flash-opaque") }, timeFlash * 2)
        setTimeout(function () { setBlackFlash("black-flash-transparent") }, timeFlash * 3)
        setTimeout(function () { setBlackFlash("black-flash-opaque") }, timeFlash * 4)
        setTimeout(function () { setBlackFlash("black-flash-transparent") }, timeFlash * 5)
        setTimeout(function () { setBlackFlash("black-flash-opaque"); dbPokemon(mainPokemon)}, timeFlash * 6)
        setTimeout(function () { setGrass(true) }, timeFlash * 9)
        setTimeout(function () { setBlackFlash("white-flash-opaque") }, timeFlash * 13)
        setTimeout(function () { setPokemonGrassPosition("pokemon-grass-tile"); setPlayerGrassPosition("player-grass-tile"); setEncounterPokemonPosition("encounter-pokemon") }, timeFlash * 15)
        setTimeout(function () { setBlackFlash("white-flash-transparent") }, timeFlash * 16)
        setTimeout(function () { document.getElementById('sound-audio').src = ("https://play.pokemonshowdown.com/audio/cries/" + mainPokemon + ".ogg"); document.getElementById('sound-audio').play(); setEncounterText("A wild " + mainPokemon.toUpperCase() + " appeared!"); setEncounterTextBool(true);  }, timeFlash * 26)
        setTimeout(function () { setEncounterTextBool(true) }, timeFlash * 28)
        setTimeout(function () { setEncounterText("What will you do?"); setShowEncounterMenu(true); }, timeFlash * 35)
    }

    const pokedexButtons = (e) => {
        let temp = document.getElementsByClassName("pokedex-page-button")
        for (let i = 0; i < temp.length; i++) {
            temp[i].style.background = "white"
        }
            e.target.style.background="#c9c9c9"

    }

    const pokedexturn = (e) => {
        if ((pokedexPage == 0 && e.target.value == "<") || (pokedexPage == 11 && e.target.value == ">") ) {
            return
        }
        let temp = document.getElementsByClassName("pokedex-page-button")
        for (let i = 0; i < temp.length; i++) {
            temp[i].style.background = "white"
        }
        if (e.target.value == ">") {

            document.getElementById(pokedexPage + 1 + "-pButton").style.background = "#c9c9c9"
        } else {
            document.getElementById(pokedexPage - 1 + "-pButton").style.background = "#c9c9c9"
        }
    }

    const throwPokeball = (e) => {
        setShowEncounterMenu(false)
        setEncounterTextBool(false)
        setPokeballID("pokeball-throw-end")
        document.getElementById('sound-audio').src = require("./audio/pokeball-throw.wav")
        document.getElementById('sound-audio').play()
        setTimeout(() => {
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-open.gif")
        }, 650);
        setTimeout(() => {
            document.getElementById('sound-audio').src = require("./audio/pokeball-open.wav")
            document.getElementById('sound-audio').play()
            setEncounterPokemonPosition('encounter-pokemon-catch')
        }, 750);
        setTimeout(() => {
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-0.png")
        }, 1500)
        setTimeout(() => {
            document.getElementById('sound-audio').src = require("./audio/pokeball-shake.wav")
            document.getElementById('sound-audio').play()
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-shake.gif")
        }, 2500)

        setTimeout(() => {
            document.getElementById('sound-audio').play()
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-shake.gif")
        }, 4250)
        setTimeout(() => {
            document.getElementById('sound-audio').play()
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-shake.gif")
        }, 6250)
        setTimeout(() => {
            registerCaughtPokemon(encounteredPokemon)
            document.getElementById('sound-audio').src = require("./audio/pokeball-confirmed.wav")
            document.getElementById('sound-audio').play()
            document.getElementById('pokeball-throw-end').src= require("./pokemon gif/pokeball-0.png")
            setPokeballID("pokeball-throw-confirmed")
        }, 8000)
        setTimeout(() => {
            document.getElementById('music-audio').src="https://vgmsite.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/pofknbfb/1-10%20Victory%20Against%20Wild%20Pok%C3%A9mon%21.mp3"
            document.getElementById('music-audio').play()
            setEncounterText("You caught " + encounteredPokemon.toUpperCase() + "!")
            setEncounterTextBool(true)
            setShowReturn(true)
            setShowEncounterMenu(true)
        }, 8500)
    }

    const restart = (e) => {
        setPokeballID("pokeball-throw-start")
        setPokemonGrassPosition("pokemon-grass-tile-origin")
        setPlayerGrassPosition("player-grass-tile-origin")
        setEncounterPokemonPosition("encounter-pokemon-origin")
        setEncounterTextBool(false)
        setShowReturn(false)
        setEncountering(false); 
        setGrass(false)
        setShowEncounterMenu(false);
        document.getElementById('music-audio').pause(); 
        setLocation("")
        setShowMirageError(false)
        setBlackFlash("black-flash-opaque")
    }

    const playMenuMusic = (e) => {
        document.getElementById('music-audio').src = "https://vgmsite.com/soundtracks/pokemon-diamond-and-pearl-super-music-collection/zuagjtiw/1-02%20Opening.mp3"
        document.getElementById('music-audio').currentTime = .4;
        var resp = document.getElementById('music-audio').play();
        if (resp!== undefined) {
            resp.then(_ => {
                // autoplay starts!
            }).catch(error => {
               //show error
            });
        }
    }

    return (
        <div id="wrapper">
            <div id="range-container">
                <div className="range-control"  style={{left: "46px"}} min="1" max="100"  onChange={(e)=> setMusicVolume(e.target.value / 100)}>
                    <input type="range" id="music-range"/>
                    <div className="range-comment">Music Volume {Math.floor(musicVolume * 100)}%</div>
                </div>
                <div className="range-control"  style={{left: "186px"}} min="1" max="100" onChange={(e)=> setSoundVolume(e.target.value / 100)}>
                    <input type="range" id="sound-range"/>
                    <div className="range-comment">Sound Volume {Math.floor(soundVolume * 100)}%</div>
                </div>
                <div id="comment">
                    Best played on a non-fullscreen browser and 1920x1080p 
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <input id="restart-menu-music" type="button" value="Restart Menu Music" onClick={() => {playMenuMusic()}}/>
                </div>
                <ReactAudioPlayer
                    id="music-audio"
                    volume={musicVolume}
                    loop
                />
                <ReactAudioPlayer
                    id="sound-audio"
                    volume={soundVolume}
                />
            </div>
            <div id="map-container">
                <div>
                    <img id="map" src={require('./content/hoenn-2.png')} />
                    <input type="button" className="location" style={{ top: "635px", left: "378px", background: "#2eafff" }} alt="Littleroot Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "580px", left: "378px", background: "#ffc756", height: "55px" }} alt="Route 101" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "545px", left: "378px", background: "#2eafff" }} alt="Oldale Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "490px", left: "378px", background: "#ffc756", height: "55px" }} alt="Route 103" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "545px", left: "270px", background: "#ffc756", width: "108px" }} alt="Route 102" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "545px", left: "235px", background: "#ff4000" }} alt="Petalburg Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "305px", left: "295px", background: "#ff820d" }} alt="Rusturf Tunnel" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "750px", left: "270px", background: "#2eafff" }} alt="Dewford Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "750px", left: "235px", background: "#ff820d" }} alt="Granite Cave" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "750px", left: "305px", background: "#3851ff", width: 225 / 2 + "px" }} alt="Route 107" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "750px", left: 305 + 225 / 2 + "px", background: "#3851ff", width: 225 / 2 + "px" }} alt="Route 108" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "670px", left: "530px", background: "#3851ff", height: "115px" }} alt="Route 109" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "545px", left: "200px", background: "#3851ff", height: "205px" }} alt="Route 105" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "715px", left: "235px", background: "#3851ff", width: "70px" }} alt="Route 106" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "715px", left: "495px", background: "#bfbfbf" }} alt="Abandoned Ship" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "490px", left: "413px", background: "#3851ff", width: "117px" }} alt="Route 103 - Surfing" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>




                    <input type="button" className="location" style={{ top: "600px", left: "530px", background: "#ff4000", height: "70px" }} alt="Slateport City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "410px", left: "530px", background: "#ffc756", height: "190px" }} alt="Route 110" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "375px", left: "530px", background: "#ff4000", width: "70px" }} alt="Mauville City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "410px", left: "565px", background: "#bfbfbf" }} alt="New Mauville" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>

                    <input type="button" className="location" style={{ top: "375px", left: "378px", background: "#2eafff" }} alt="Verdanturf Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "375px", left: "413px", background: "#ffc756", width: "117px" }} alt="Route 117" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "340px", left: "200px", background: "#ff4000", height: "70px" }} alt="Rustboro City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "340px", left: "235px", background: "#ffc756", width: "178px" }} alt="Route 116" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "410px", left: "200px", background: "#ffc756", height: "100px" }} alt="Route 104" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "510px", left: "200px", background: "#57d900" }} alt="Petalburg Woods" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>



                    <input type="button" className="location" style={{ top: "270px", left: "200px", background: "#ffc756", height: "70px" }} alt="Route 115" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "200px", left: "200px", background: "#ff820d", height: "70px" }} alt="Meteor Falls" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "235px", background: "#ffc756", height: "105px" }} alt="Route 114" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "270px", background: "#ffc756", width: "73px" }} alt="Route 114" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "343px", background: "#2eafff" }} alt="Fallabor Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>

                    <input type="button" className="location" style={{ top: "130px", left: "565px", background: "#ffc756", height: "245px" }} alt="Route 111" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "378px", background: "#ffc756", width: "187px" }} alt="Route 113" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "413px", background: "#2eafff" }} alt="Lavaridge Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "448px", background: "#ffc756", width: "117px" }} alt="Route 112" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "240px", left: "495px", background: "#ff820d" }} alt="Jagged Pass" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "240px", left: "530px", background: "#ff820d" }} alt="Fiery Pass" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "205px", left: "495px", background: "#ff820d" }} alt="Mt. Chimney" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>


                    <input type="button" className="location" style={{ top: "310px", left: "861px", background: "#ff820d" }} alt="Mt. Pyre" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "240px", left: "896px", background: "#00b105" }} alt="Safari Zone" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "771px", background: "#ff4000" }} alt="Fortree City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "736px", background: "#ffc756", height: "280px" }} alt="Route 119" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "375px", left: "600px", background: "#ffc756", width: "136px" }} alt="Route 118" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "666px", background: "#c0c0ff", width: "70px" }} alt="Weather Institute" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "130px", left: "806px", background: "#ffc756", height: "180px" }} alt="Route 120" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "841px", background: "#ffc756", width: "139px" }} alt="Route 121" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "980px", background: "#ff4000", width: "70px" }} alt="Lilycove City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "375px", left: "771px", background: "#ffc756", width: "125px" }} alt="Route 123" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "310px", left: "896px", background: "#ffc756", height: "100px" }} alt="Route 122" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "1050px", background: "#3851ff", height: "255px" }} alt="Route 124" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "437px", left: "1125px", background: "#ff4000" }} alt="Sootopolis" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>


                    <input type="button" className="location" style={{ top: "275px", left: "1085px", background: "#3851ff", width: "244px" }} alt="Route 125" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "530px", left: "1400px", background: "#ff4000", height: "70px" }} alt="Evergrande City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "495px", left: "1400px", background: "#ff820d"}} alt="Victory Road" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "565px", left: "1329px", background: "#3851ff", width: "71px" }} alt="Route 128" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "310px", left: "1259px", background: "#ff4000", width: "70px" }} alt="Mossdeep City" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "240px", left: "1294px", background: "#ff820d" }} alt="Shoal Cave" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "275px", left: "1329px", background: "#3851ff", height: "290px" }} alt="Route 127" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "495px", left: "1085px", background: "#3851ff", width: "244px" }} alt="Route 126" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>

                    <input type="button" className="location" style={{ top: "600px", left: "920px", background: "#2eafff" }} alt="Pacifidlog Town" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: "955px", background: "#3851ff", width: 409 / 3 + "px" }} alt="Route 131" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: 955 + 409 / 3 + "px", background: "#3851ff", width: 409 / 3 + "px" }} alt="Route 130" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: 955 + 409 / 1.5 + "px", background: "#3851ff", width: 409 / 3 + "px" }} alt="Route 129" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: "565px", background: "#3851ff", width: 355 / 3 + "px" }} alt="Route 134" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: 565 + 355 / 3 + "px", background: "#3851ff", width: 355 / 3 + "px" }} alt="Route 133" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "600px", left: 565 + 355 / 1.5 + "px", background: "#3851ff", width: 355 / 3 + "px" }} alt="Route 132" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "540px", left: "1075px", background: "#d8d8d8" }} alt="Sky Pillar" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "530px", left: "1145px", background: "#2738af", width: "184px", height: "70px" }} alt="Seafloor Cavern" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    
                    {username == "admin" ? <><input type="button" className="location" style={{ top: "745px", left: "1386px", background: "#00b105" }} alt="Legendary Island" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
                    <input type="button" className="location" style={{ top: "749px", left: "729px", background: "#00b105" }} alt="Mirage Island" onClick={(e) => {{ setLocation(e.target.alt); if (location == e.target.alt) {selectPokemon()}} }}></input>
</> : <></>}
                    
                </div>
                {grass ? <><img id="grass-pokemon" src={require("./content/grass-map.png")}/>
                    <div id={pokemonGrassPosition}>
                        <img id={encounterPokemonPosition} onError={(e) => {e.target.src = require("./pokemon gif/missing.png"); setEncounterPokemon("MissingNo"); setMiragePokemon("MissingNo")}} className="battle-pokemon-gif" src={"https://img.pokemondb.net/sprites/black-white/anim/normal/" + encounteredPokemon + ".gif"} />
                    </div>
                    <div id={playerGrassPosition} />
                    <img id={pokeballID} src={require('./pokemon gif/pokeball-throw.gif')} />
                    {encounterTextBool ?
                        <div className="battle-background-1">
                            <div className="battle-background-2">
                                <div className="battle-container">
                                    {encounterText}
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </> : <></>}

                {showPokedex ? 
                <>
                <img id="pokedex-image" src={require("./pokemon gif/pokedex.png")}/>
                    <div id="pokedex">
                        {getPokedex(pokedexPage)}
                    </div> 
                    <div id="pokedex-buttons">
                        {[...Array(12)].map((x, i) => <input style={ i == 0 ? {background:"#c9c9c9"}: {}}id={i + "-pButton"}className="pokedex-page-button" type="button" value={i + 1} onClick={(e)=>{setPokedexPage(e.target.value - 1); pokedexButtons(e)}}/>)} 
                        <input className="pokedex-page-turn" type="button" value="<" style={{left: "-146px"}} onClick={(e) => {if (pokedexPage != 0) {setPokedexPage(pokedexPage - 1)}; pokedexturn(e)}}/>
                        <input className="pokedex-page-turn" type="button" value=">" style={{left: "1256px"}} onClick={(e) => {if (pokedexPage != 11) {setPokedexPage(pokedexPage + 1)}; pokedexturn(e)}}/>

                    </div>
                </>
                : <div/>}
                {encountering ? <div id={blackFlash} className="black"/> : <></>}
            </div>

            {!encountering ?
                <div id="menu-container">
                    <div id="buttons-container">
                        <div className="pokemon-text">{username}</div>
                        {isGuest ? <></> : <><input className="pokemon-button" type="button" value="Pokedex" onClick={() => {Pokdexing(); document.getElementById("sound-audio").src= require("./audio/pokedex-open.wav"); document.getElementById("sound-audio").play()}}></input></>}
                        <input className="pokemon-button" type="button" value="Log Out" onClick={() => { navigate("/") }}></input>
                    </div>
                    <div id="pokemon-container"> 
                        <div id="location">{location != "" ? <>{location == "Mirage Island" ? "You have chosen" : "Pokemon spotted at"}</> : <div>Choose a Location</div>}</div>
                        <div id="location">{location != "" ? location : <br />}</div>
                        {invalidLocation ? <div id="mirage-text"> There's nothing here! Try a ROUTE instead!</div> : <div/>}
                        {location == "Mirage Island" ? <><div id="mirage-text">Select a Pokemon</div><input id="mirage-form" type="email" onChange={(e) => (setMiragePokemon(e.target.value.toLowerCase()))}/> {showMirageError ? <div id="mirage-error">That Pokemon does not seem to exist.</div> :<><div id="mirage-comment">Make sure to type the Pokemon's name correctly or you'll encounter a MissingNo!</div> <div id="mirage-comment">Also TRY YOUR LUCK for a random pokemon!</div></>}</> : <></>}
                        {location != "" && location != "Mirage Island" && !invalidLocation ? <img onLoad={(e) => seenEncounterPokemon(randomPokemon[0], e.target.id)} className="pokemon-menu-sprite" id="1-pokemon" src={"https://img.pokemondb.net/sprites/black-white/normal/" + randomPokemon[0] + ".png"} /> : <></>}
                        {location != "" && location != "Mirage Island" && !invalidLocation ?<img onLoad={(e) => seenEncounterPokemon(randomPokemon[1], e.target.id)} className="pokemon-menu-sprite" id="2-pokemon" src={"https://img.pokemondb.net/sprites/black-white/normal/" + randomPokemon[1] + ".png"} /> : <></>}
                        {location != "" && location != "Mirage Island" && !invalidLocation ? <img onLoad={(e) => seenEncounterPokemon(randomPokemon[2], e.target.id)} className="pokemon-menu-sprite" id="3-pokemon" src={"https://img.pokemondb.net/sprites/black-white/normal/" + randomPokemon[2] + ".png"} /> : <></>}
                        {location != "" && location == "Mirage Island" ? <input className="pokemon-luck-button" type="button" value="Try your luck!" onClick={encounter}></input> : <></>}
                        {location != "" && !invalidLocation ? <input className="pokemon-encounter-button" type="button" value="Start Encounter!" onClick={encounter}></input> : <></>}
                    </div>
                </div>
                : <>
                    {
                        showEncounterMenu ? <>

                            <div id="encounter-menu-container">
                                <div id="encounter-buttons-container">
                                    {showReturn ? <div>
                                        <input id="run-button" type="button" value="Return" onClick={() => {        
                                                setShowReturn(false)
                                                setShowEncounterMenu(false)
                                                setBlackFlash("black-flash-opaque")
                                                setTimeout(() => {
                                                    restart()
                                                    setEncountering(true)
                                                    setBlackFlash("black-flash-transparent")
                                                }, 500);
                                                setTimeout(() => {
                                                    playMenuMusic()
                                                    setEncountering(false)
                                                }, 1000)
                                            }}>
                                        </input>
                                    </div>
                                        :
                                        <>
                                            <input id="catch-button" type="button" value="Catch" onClick={throwPokeball}></input>
                                            <input id="run-button" type="button" value="Run" onClick={() => {        
                                                document.getElementById('sound-audio').src = require("./audio/pokemon-run.wav")
                                                document.getElementById('sound-audio').play()
                                                setEncounterText("You ran away!")
                                                setShowEncounterMenu(false)
                                                setTimeout(function () { setBlackFlash("black-flash-opaque") }, 2500)
                                                setTimeout(() => {
                                                    restart()
                                                    setEncountering(true)
                                                    setBlackFlash("black-flash-transparent")
                                                }, 3000);
                                                setTimeout(() => {
                                                    playMenuMusic()
                                                    setEncountering(false)
                                                }, 3500)
                                            }}>
                                            </input>
                                        </>
                                    }
                                </div>
                            </div>
                        </>
                            :
                            <>
                                {showPokedex ?
                                    <div id="pokedex-menu-container">
                                        <div id="pokedex-menu">
                                            <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                                                <img id="pokedex-tile" src={require("./pokemon gif/pokedex-tile.png")}/>
                                                <img id="pokedex-pokemon" src={"https://img.pokemondb.net/sprites/black-white/anim/normal/"+ pokedexPokemon + ".gif"} onError={(e) => {e.target.src = require("./pokemon gif/blank.png")}}/>
                                                <div id="pokedex-text-container">
                                                    <div id="pokedex-pokemon-name">{pokedexPokemon.toUpperCase()}</div>
                                                    <div id="pokedex-description">{getDescription(pokedexPokemon)}</div>
                                                    {!pokedexCaught ? <></> : <img id="pokedex-caught"src={require("./pokemon gif/pokeball-pokedex.png")}/>}
                                                </div>
                                            </div>
                                            <input className="pokemon-encounter-button" type="button" value="Return" onClick={() => {
                                                document.getElementsByClassName("black")[0].style.width = "1500px"
                                                setPokedexPokemon("")
                                                setBlackFlash("black-flash-opaque")
                                                setShowPokedex(false)
                                                setEncountering(true)
                                                setTimeout(() => {
                                                    setBlackFlash("black-flash-transparent")
                                                    setShowPokedex(false)
                                                }, 500);
                                                setTimeout(() => {
                                                    setEncountering(false)
                                                    setBlackFlash("black-flash-opaque")
                                                }, 1000)
                                            }}
                                            />
                                        </div>
                                    </div>
                                    :
                                <div/>
                        }
                            </>
                    }
                </>
            }

        </div>
    )

}

//                        <img src="https://img.pokemondb.net/sprites/sword-shield/icon/sceptile.png"></img>
//                    <img src="https://img.pokemondb.net/sprites/black-white/anim/normal/salamence.gif" alt="Treecko"/>

// Add YT to play Route music...Add range sliders for volume and route opacity...add npm-schedule for chance maker...get sounds for pokemons