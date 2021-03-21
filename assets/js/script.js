// \

$(document).ready(function () {

    // CONSTANTS
    const XP_LEVELS = [0, 50, 100, 150, 200, 250]
    const HP_START = 100
    //const LOCATION_START = farm_insideBarn

    // ENEMY DATA
    const FARM_SPIDER = ["Farm Spider", "arachnidia farmus", "worker", 2, 25, 5, 3, 10, {
        "Tiny Carapace": "1",
        "Rusty Screw": "0.3"
    }, 5, "assets/img/enemies/farm-spider.png"]

    // ITEM DATA
    const MILK_BOTTLE = ["Milk Bottle", 3, "potion", 20, 5, "assets/img/items/milk-bottle.png"]

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
        this.currentLocation = farm_insideBarn
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

    // EQUIPMENT OBJECTS
    function Equipment(name, slot, level, modifier, perk, skills, img) {
        this.name = name
        this.slot = slot
        this.level = level
        this.modifier = modifier
        this.perk = perk
        this.img
        this.skills = {
            "skill-1": "3",
            "skill-2": "5",
            "skill-3": "7",
            "skill-4": "10"
        }
    }

    // ITEM OBJECTS 
    function Item(name, max, type, modifier, value, img) {
        this.name = name
        this.remaining = max
        this.max = max
        this.type = type
        this.modifier = modifier
        this.value = value
        this.img = img
    }

    // PERK OBJECTS
    function Perk(name, cooldown, effect, color) {
        this.name = name
        this.cooldown = cooldown
        this.effect = effect
        this.color = color
        this.level = 1
        this.active = false
    }

    // BAG OBJECT
    function Bag(name, capacity) {
        this.name = name
        this.capacity = capacity
    }

    // CREATE OBJECT FUNCTIONS
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

    createItemObject = (item) => {
        let name = item[0]
        let max = item[1]
        let type = item[2]
        let modifier = item[3]
        let value = item[4]
        let img = item[5]
        return new Item(name, max, type, modifier, value, img)
    }

    // INITIALISE
    let farm_insideBarn = new Location("Townston", "Townston Farm", "Inside Barn", "assets/img/locations/areas/farm_inside-barn.jpg")
    let beginnersLuck = new Perk("Beginner's Luck", 10, "beginnersLuck(player)", "whitesmoke")
    let bag = new Bag("LIDL bag", 10)

    var player = new Player("Siph", "Human", "Joiner", "Fish God Love", 666, 420, 69, "assets/img/player-image.jpg");

    // UPDATE DISPLAY
    updateDisplay = () => { 
        $(".location-image > img").attr("src", "assets/img/locations/cities/townston-farm.jpg")
        $(".location-city").text(player.currentLocation.city)
        $(".location-clout").text(player.currentLocation.clout)
        $(".location-town").html(player.currentLocation.town + "<br>" + player.currentLocation.area)
        //$(".location-area").text(player.currentLocation.area)
        $(".player-image > img").attr("src", player.img)
        $(".player-name").text(player.name)
        $(".player-level").text("Level " + player.level)
        $(".player-XP").text(player.XP.current + " / " + player.XP.toNext)
        $(".player-race").text(player.race + " " + player.job)
        //$(".player-job").text(playerjob)
        $(".player-blessing").text(player.blessing)
    }

    // RUN TIME CODE

    var item = createItemObject(MILK_BOTTLE)
    console.log(player)
    updateDisplay()
})