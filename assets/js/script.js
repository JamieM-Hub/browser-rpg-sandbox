// \

$(document).ready(function () {

    // CONSTANTS
    const XP_LEVELS = [0, 50, 100, 150, 200, 250]
    const HP_START = 100
    //const LOCATION_START = farm_insideBarn

    // NPC DIALOGUE DATA
    const D_FARMER_JOE = [
        [ // D_0
            "Howdy partner! You look like you need a helping hand.",
            "This ain't no place for a lil pie like you. You should head to the town and find some Lemsip.",
            "Good luck! Don't forget to knock on your way out. YEE-HAW!"
        ],
        [ // D_1
            "You again! I told you to go get some Lemsip.",
            "YEE-HAW!"
        ]
    ]

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
        this.currentNPC = farmerJoe
    }

    // NPC OBJECTS
    function NPC(name, race, job, level, dialogue, img) {
        this.name = name
        this.race = race
        this.job = job
        this.level = level
        this.dialogue = dialogue
        this.img = img
    }

    // ENEMY OBJECTS
    function Enemy(name, race, job, level, HP, attack, defense, speed, loot, XP, img) {
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

    // DISPLAY OBJECT 
    function Display() {
        this.currentLocation = farm_insideBarn
        this.currentNPC = farmerJoe
        this.nextParagraph = ""
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
        return new Enemy(name, race, job, level, HP, attack, defense, speed, loot, XP, img)
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


    let farm_insideBarn = new Location("Townston", "Townston Farm", "Inside Barn", "assets/img/locations/areas/farm_inside-barn.jpg")
    let beginnersLuck = new Perk("Beginner's Luck", 10, "beginnersLuck(player)", "whitesmoke")
    let bag = new Bag("LIDL bag", 10)
    let farmerJoe = new NPC("Farmer Joe", "Human", "Beefmaster", 1, D_FARMER_JOE, "assets/img/NPCs/farmer-face.jpg")
    let display = new Display()
    display.nextParagraph = farmerJoe.dialogue[0]
    var player = new Player("Siph", "Human", "Joiner", "Fish God Love", 666, 420, 69, "assets/img/player-image.jpg");
    var item = createItemObject(MILK_BOTTLE)


    // FUNCTIONS

    showCommandInput = () => {
        $(".option-button > .d-none").removeClass("d-none")
    }

    perk1 = () => {
        console.log("perk activated")
    }

    // UPDATE DISPLAY
    updateDisplay = () => {
        $(".location-image > img").attr("src", "assets/img/locations/cities/townston-farm.jpg")
        $(".location-name").html(
            player.currentLocation.city + "<br>" +
            player.currentLocation.town + "<br>" +
            player.currentLocation.area)
        $(".location-clout").text(player.currentLocation.clout)

        $(".player-image > img").attr("src", player.img)
        $(".player-name").text(player.name)
        $(".player-level").text("Level " + player.level)
        $(".player-XP").text(player.XP.current + " / " + player.XP.toNext)
        $(".player-race").text(player.race + " " + player.job)
        $(".player-blessing").text(player.blessing)

        $("#NPC-image > img").attr("src", player.currentNPC.img)
        $("#NPC-name").text(player.currentNPC.name)
        $("#NPC-race-class").text(player.currentNPC.race + " " + player.currentNPC.job)
        $("#NPC-level").text("Level " + player.currentNPC.level)
        $("#spoken-text").text(display.nextParagraph)
    }

    // RUN TIME CODE

    console.log(farmerJoe)
    console.log(player)
    updateDisplay()

    // https://www.tutorialspoint.com/How-to-fire-after-pressing-ENTER-in-text-input-with-HTML
    $('input').bind("Escape",function(e){
        $("#command").addClass("d-none")
     });

     $('input').keyup(function(e){
        if(e.keyCode == 27)
        {
           $(this).trigger("Escape");
        }
     });

     $('input').bind("enterKey",function(e){
        var commandInput = $("#command").val()
        //$("#command").attr("type", "reset")
        console.log(commandInput)
        $("#command").addClass("d-none")
     });

     $('input').keyup(function(e){
        if(e.keyCode == 13)
        {
           $(this).trigger("enterKey");
        }
     });



})