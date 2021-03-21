$(document).ready(function () {

    // CONSTANTS
    const XP_LEVELS = [0, 50, 100, 150, 200, 250]
    const HP_START = 100

    // ENEMY DATA
    const FARM_SPIDER = ["Farm Spider", "arachnidia farmus", "worker", 2, 25, 5, 3, 10, {
        "Tiny Carapace": "1",
        "Rusty Screw": "0.3"
    }, 5, "assets/img/enemies/farm-spider.png"]

    // PLAYER OBJECT
    function Player(name, race, job, blessing, attack, defense, speed, img) {
        this.name = name
        this.race = race
        this.job = job
        this.blessing = blessing
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.img = img
        this.gold = 0
        this.level = 1
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

    // NPC OBJECTS
    function NPC(name, race, job, level, HP, attack, defense, speed, loot, XP, img) {
        this.name = name
        this.race = race
        this.job = job
        this.level = level
        this.HP = {
            current: HP,
            max: HP
        }
        this.attack = attack
        this.defense = defense
        this.speed = speed
        this.loot = loot
        this.XP = XP
        this.img = img
    }

    // LOCATION OBJECTS
    function Location(city, town, area, img) {
        this.city = city
        this.town = town
        this.area = area
        this.img = img
        this.clout = 0
    }

    // FUNCTIONS
    createEnemyObject = (enemy) => {
        let name = enemy[0]
        let race = enemy[1]
        let job = enemy[2]
        let level = enemy[3]
        let HP = enemy[4]
        let attack = enemy[5]
        let defense = enemy[6]
        let speed = enemy[7]
        let loot = enemy[8]
        let XP = enemy[9]
        let img = enemy[10]
        return new NPC(name, race, job, level, HP, attack, defense, speed, loot, XP, img)
    }

    // INITIALISE
    var player = new Player("Siph", "Human", "Warrior", "Fish God Love", 666, 420, 69, "assets/img/player-image.jpg");
    let farm_insideBarn = new Location("Townston", "Townston Farm", "Inside Barn", "assets/img/locations/areas/farm_inside-barn.jpg")
    // RUN TIME CODE

    var enemy = createEnemyObject(FARM_SPIDER)
    console.log(farm_insideBarn)

})