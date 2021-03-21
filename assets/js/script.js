$(document).ready(function () {

    const XP_LEVELS = [0, 50, 100, 150, 200, 250];
    const HP_START = 100

    function Player(name, race, skill, blessing, attack, defense, speed, img) {
        this.name = name;
        this.race = race;
        this.skill = skill;
        this.blessing = blessing;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.img = img;
        this.gold = 0;
        this.level = 1;
        this.XP = {
            current: "0",
            toNext: XP_LEVELS[1]
        }
        this.HP = {
            max: HP_START,
            current: HP_START
        }
        this.status = [false]
        this.perks = []
    }

    var player = new Player("Siph", "Human", "Warrior", "Fish God Love", 666, 420, 69, "assets/img/player-image.jpg");

    console.log(player)
})