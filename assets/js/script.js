// \

$(document).ready(function () {

    // CONSTANTS
    const XP_LEVELS = [0, 50, 100, 150, 200, 250]
    const HP_START = 100
    const MAIN_MENU = "mainMenu"
    //LOCATION_START = farm_insideBarn

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

    // LOCATION COMMAND OPTIONS
    const FARM_INSIDEBARN = {
        "door": "The doorway leads outside.",
        "wall": "The beams are sturdy but the barn doesn't seem to be in use.",
        "floor": "Stone cold. Steve Austin.",
        "face": "There's nobody there...",
        "think": "Best be thinking about how the hell you're getting home."
    }

    const FARM_OUTSIDEBARN = {
        "door": "A door leads into the barn.",
        "wall": "The beams are sturdy but the barn doesn't seem to be in use.",
        "floor": "Grass. Slightly moist.",
        "face": "There's nobody there...",
        "think": "Best be thinking about how the hell you're getting home."
    }

    // ENEMY DATA
    const FARM_SPIDER = ["Farm Spider", "arachnidia farmus", "worker", 2, 25, 5, 3, 10, {
        "Tiny Carapace": "1",
        "Rusty Screw": "0.3"
    }, 5, "assets/img/enemies/farm-spider.png"]

    // EQUIPMENT DATA
    const SIMPLE_SWORD = [
        "Simple Sword", "hand", 1, 5, "Brawn Over Brain",
        [
            "Double Slash",
            "Triplet Slash",
            "Quattro Formaggi Slash",
            "Omni-Slash"
        ], "assets/img/equipment/simple-sword.png"
    ]
    const SIMPLE_SHIELD = [
        "Simple Shield", "hand", 1, 7, "DEFCON",
        [
            "Tank Mode",
            "Turtle Mode",
            "Juggernaut Mode",
            "Havel Mode"
        ], "assets/img/equipment/simple-shield.png"
    ]
    const CAMO_CAP = [
        "Camo Cap", "head", 1, 2, "Streetwise",
        [
            "Snapback Cap",
            "Upside Down Cap",
            "Inside Out Cap",
            "Balance On Head"
        ], "assets/img/equipment/camo-cap.png"
    ]
    const TUXEDO = [
        "Tuxedo", "body", 1, 3, "Cool Guy",
        [
            "Double Agent",
            "00 Agent",
            "007: James Bond",
            "Sterling Archer"
        ], "assets/img/equipment/tuxedo.png"
    ]
    const HERMES_BOOTS = [
        "Hermes Boots", "feet", 1, 2, "Levitation",
        [
            "Hussain Bolt",
            "Sonic The Hedgehog",
            "Voyager-1",
            "Mr Time"
        ], "assets/img/equipment/hermes-boots.png"
    ]
    const BLUE_RING = [
        "Blue Ring", "trinket", 1, 0, "Blue Mist",
        [
            "Uneasy Feeling",
            "Weird Smell",
            "Sweaty Palms",
            "Demon Possession"
        ], "assets/img/equipment/blue-ring.png"
    ]

    // ITEM DATA
    const MILK_BOTTLE = ["Milk Bottle", 3, "potion", 20, 5, "assets/img/items/milk-bottle.png"]

    // GLOBAL VARIABLES
    var mainMenuOpen = false
    var inventoryOpen = false

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
        this.equipped = {
            "left-hand": "",
            "right-hand": "",
            "head": "",
            "body": "",
            "feet": "",
            "trinket": "",
        }
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
    function Location(city, town, area, navigation, img) {
        this.city = city
        this.town = town
        this.area = area
        this.navigation = navigation
        this.img = img
        this.clout = 0
    }

    let farm_insideBarn = new Location("Townston City", "Townston Farm", "Inside Barn", FARM_INSIDEBARN, "assets/img/locations/areas/farm_inside-barn.jpg")
    let farm_outsideBarn = new Location("Townston City", "Townston Farm", "Outside Barn", FARM_OUTSIDEBARN, "assets/img/locations/areas/farm_outside-barn.jpg")

    // EQUIPMENT OBJECTS
    function Equipment(name, slot, level, modifier, perk, skills, img) {
        this.name = name
        this.slot = slot
        this.level = level
        this.modifier = modifier
        this.perk = perk
        this.skills = skills
        this.img = img

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
        this.narratorResponse = "Welcome!"
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

    createEquipmentObject = (equipment) => {
        let name = equipment[0]
        let slot = equipment[1]
        let level = equipment[2]
        let modifier = equipment[3]
        let perk = equipment[4]
        let skills = equipment[5]
        let img = equipment[6]
        return new Equipment(name, slot, level, modifier, perk, skills, img)
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
    let beginnersLuck = new Perk("Beginner's Luck", 10, "beginnersLuck(player)", "whitesmoke")
    let bag = new Bag("LIDL bag", 10)
    let farmerJoe = new NPC("Farmer Joe", "Human", "Beefmaster", 1, D_FARMER_JOE, "assets/img/NPCs/farmer-face.jpg")
    let display = new Display()
    display.nextParagraph = farmerJoe.dialogue[0]
    var player = new Player("Siph", "Human", "Joiner", "Fish God Love", 666, 420, 69, "assets/img/player-image.jpg");
    var item = createItemObject(MILK_BOTTLE)
    var simpleSword = createEquipmentObject(SIMPLE_SWORD)
    var simpleShield = createEquipmentObject(SIMPLE_SHIELD)
    var camoCap = createEquipmentObject(CAMO_CAP)
    var tuxedo = createEquipmentObject(TUXEDO)
    var hermesBoots = createEquipmentObject(HERMES_BOOTS)
    var blueRing = createEquipmentObject(BLUE_RING)

    // FUNCTIONS
    showCommandInput = () => {
        $(".option-button > .d-none").removeClass("d-none")
    }

    perk1 = () => {
        console.log("perk 1 activated")
    }

    // COMMAND READER
    processCommand = () => {
        let command = $("#command").val().toLowerCase()

        // check command for all location objects
        // -> output narration
        // else check command against command functions for all locations
        // -> process function
        // else check command against global preset responses
        // -> output narration
        // else output defalt narration "i don't understand that command" etc

        // if location has a narration for command, print command
        if (player.currentLocation.navigation[command] != null) {
            display.narratorResponse = player.currentLocation.navigation[command]
        }

        if (command == "door") {
            if (player.currentLocation == farm_insideBarn) {
                changeLocation(farm_outsideBarn)
            } else if (player.currentLocation == farm_outsideBarn) {
                display.narratorResponse = "you entered the barn"
                changeLocation(farm_insideBarn)
            }
        }


        updateDisplay()
    }

    // https://www.tutorialspoint.com/How-to-fire-after-pressing-ENTER-in-text-input-with-HTML
    $('input').bind("Escape", function (e) {
        $("#command").addClass("d-none")
    });

    $('input').keyup(function (e) {
        if (e.keyCode == 27) {
            $(this).trigger("Escape");
        }
    });

    $('input').bind("enterKey", function (e) {
        var commandInput = $("#command").val()
        //$("#command").attr("type", "reset")
        processCommand(commandInput)
        $("#command").addClass("d-none")
    });

    $('input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });

    // CHANGE LOCATION
    changeLocation = (nextLocation) => {
        console.log("location changed from " + player.currentLocation.area + " to " + nextLocation.area)
        player.currentLocation = nextLocation
        player.currentNPC = null
        updateDisplay()
    }

    // TOP BUTTONS
    openMainMenu = () => {
        if (!(mainMenuOpen) && !(inventoryOpen)) {
            console.log("close loc open main")
            $("#mainMenu").removeClass("d-none")
            $("#location-background").addClass("d-none")
            mainMenuOpen = true;
        } else if (!(mainMenuOpen) && (inventoryOpen)) {
            console.log("close inv open main")
            $("#mainMenu").removeClass("d-none")
            $("#inventory").addClass("d-none")
            mainMenuOpen = true;
        } else if (mainMenuOpen) {
            console.log("close main open loc")
            $("#mainMenu").addClass("d-none")
            $("#location-background").removeClass("d-none")
            mainMenuOpen = false;
        }

    }

    openInventory = () => {
        if (!(inventoryOpen) && !(mainMenuOpen)) {
            //console.log ("close loc open inv")
            $("#inventory").removeClass("d-none")
            $("#location-background").addClass("d-none")
            inventoryOpen = true;
        } else if (!(inventoryOpen) && (mainMenuOpen)) {
            //console.log ("close main open inv")
            $("#inventory").removeClass("d-none")
            $("#mainMenu").addClass("d-none")
            inventoryOpen = true;
        } else if (inventoryOpen) {
            //console.log ("close inv open loc")
            $("#location-background").removeClass("d-none")
            $("#inventory").addClass("d-none")
            inventoryOpen = false;
        }
    }

    // UPDATE DISPLAY
    updateDisplay = () => {
        //url = "url(farm_insideBar +
        console.log(player.currentLocation.img)
        $(".location-image > img").attr("src", player.currentLocation.img)
        $("#location-background").css("background-image", "url(\"" + player.currentLocation.img + "\")")
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

        if (player.currentNPC == null) {
            $("#NPC-image > img").attr("src", player.currentLocation.img)
            $("#NPC-name").text("")
            $("#NPC-race-class").text("")
            $("#NPC-level").text("")
            $("#spoken-text").text(""display.nextParagraph"")
        } else {
            $("#NPC-image > img").attr("src", player.currentNPC.img)
            $("#NPC-name").text(player.currentNPC.name)
            $("#NPC-race-class").text(player.currentNPC.race + " " + player.currentNPC.job)
            $("#NPC-level").text("Level " + player.currentNPC.level)
            $("#spoken-text").text(display.nextParagraph)
        }
        
        $("#narrator").text(display.narratorResponse)

        $("#left-hand").find("img").attr("src", player.equipped["left-hand"].img)
        $("#right-hand").find("img").attr("src", player.equipped["right-hand"].img)
        $("#head").find("img").attr("src", player.equipped["head"].img)
        $("#body").find("img").attr("src", player.equipped["body"].img)
        $("#feet").find("img").attr("src", player.equipped["feet"].img)
        $("#trinket").find("img").attr("src", player.equipped["trinket"].img)
    }

    // RUN TIME CODE
    player.equipped["left-hand"] = simpleSword
    player.equipped["right-hand"] = simpleShield
    player.equipped["head"] = camoCap
    player.equipped["body"] = tuxedo
    player.equipped["feet"] = hermesBoots
    player.equipped["trinket"] = blueRing
    updateDisplay()


});