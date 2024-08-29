namespace SpriteKind {
    export const BUTTON = SpriteKind.create()
    export const Life = SpriteKind.create()
    export const BounceyBall = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const Thumper = SpriteKind.create()
    export const missel = SpriteKind.create()
    export const dropBOMB = SpriteKind.create()
    export const mushroom = SpriteKind.create()
    export const lazer = SpriteKind.create()
    export const MOVE = SpriteKind.create()
    export const activate = SpriteKind.create()
    export const bouncy = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile10`)
    info.changeLifeBy(-1)
})
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    timer.after(7500, function () {
        sprites.destroy(sprite, effects.fire, 500)
    })
})
sprites.onOverlap(SpriteKind.dropBOMB, SpriteKind.Player, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile10`)
    scene.cameraShake(6, 500)
    info.changeLifeBy(-1)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile5`)) {
        scene.cameraShake(12, 50)
    } else if (sprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile16`) && !(sprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) || sprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile3`))) {
        timer.after(250, function () {
            if (BOSSBattle) {
                tiles.setWallAt(location, false)
                tiles.setTileAt(location, assets.tile`myTile11`)
            } else {
                tiles.setWallAt(location, false)
                tiles.setTileAt(location, assets.tile`myTile1`)
            }
        })
        timer.after(1250, function () {
            tiles.setWallAt(location, true)
            tiles.setTileAt(location, assets.tile`myTile16`)
        })
    }
})
sprites.onOverlap(SpriteKind.mushroom, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(6, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    info.changeScoreBy(info.life() * 10)
    info.changeScoreBy(info.countdown())
    blockSettings.writeNumber("SCORE", 1)
    blockSettings.writeNumber("LEVEL", 1)
    blockSettings.writeNumber("LIFE", 10)
    game.gameOver(true)
})
scene.onHitWall(SpriteKind.dropBOMB, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile7`)
    scene.cameraShake(4, 500)
    sprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . 2 1 1 1 2 . . . . . 
        . . . . . . 2 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    sprite.ay = 0
    timer.after(500, function () {
        sprite.ay = 250
    })
})
function make_lazers () {
    for (let value of tiles.getTilesByType(assets.tile`myTile18`)) {
        laser = sprites.create(img`
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................dddd......................
            ......................d11d......................
            ......................d11d......................
            ......................dddd......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            `, SpriteKind.lazer)
        tiles.placeOnTile(laser, value)
        laser.setFlag(SpriteFlag.GhostThroughWalls, true)
        animation.runImageAnimation(
        laser,
        [img`
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            2222222222222222222222dddd2222222222222222222222
            2222222222222222222222d11d2222222222222222222222
            2222222222222222222222d11d2222222222222222222222
            2222222222222222222222dddd2222222222222222222222
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            ................................................
            `,img`
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................dddd......................
            ......................d11d......................
            ......................d11d......................
            ......................dddd......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            ......................2222......................
            `],
        1250,
        true
        )
    }
}
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile10`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`myTile12`)) {
        game.showLongText(sign, DialogLayout.Center)
    } else {
        if (info.score() >= 100) {
            info.changeScoreBy(-100)
            info.changeLifeBy(1)
        }
        if (controller.A.isPressed()) {
            game.reset()
        }
    }
})
function Make (level: number) {
    togle = false
    toglenum = false
    info.changeScoreBy(info.countdown())
    blockSettings.writeNumber("LEVEL", currentLevel)
    blockSettings.writeNumber("SCORE", info.score())
    blockSettings.writeNumber("LIFE", info.life())
    info.startCountdown(300)
    BOSSBattle = false
    killsneaded = 1
    sprites.destroyAllSpritesOfKind(SpriteKind.activate)
    sprites.destroyAllSpritesOfKind(SpriteKind.Thumper)
    sprites.destroyAllSpritesOfKind(SpriteKind.boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.mushroom)
    sprites.destroyAllSpritesOfKind(SpriteKind.dropBOMB)
    sprites.destroyAllSpritesOfKind(SpriteKind.lazer)
    sprites.destroyAllSpritesOfKind(SpriteKind.MOVE)
    if (level == 1) {
        tiles.setCurrentTilemap(tilemap`level15`)
        sign = "lvl 1 .Arrow key to move. A or up to jump"
    } else if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level6`)
    } else if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level22`)
    } else if (level == 4) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (level == 5) {
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (level == 6) {
        tiles.setCurrentTilemap(tilemap`level3`)
    } else if (level == 7) {
        tiles.setCurrentTilemap(tilemap`level8`)
    } else if (level == 8) {
        tiles.setCurrentTilemap(tilemap`level9`)
        sign = "lvl 8. Let's shake things up"
    } else if (level == 9) {
        tiles.setCurrentTilemap(tilemap`level16`)
    } else if (level == 10) {
        tiles.setCurrentTilemap(tilemap`level23`)
        sign = "lvl 10.All is backwards"
    } else if (level == 11) {
        tiles.setCurrentTilemap(tilemap`level17`)
        sign = "grass will slow you down"
    } else if (level == 12) {
        tiles.setCurrentTilemap(tilemap`level10`)
    } else if (level == 13) {
        tiles.setCurrentTilemap(tilemap`level19`)
    } else if (level == 14) {
        tiles.setCurrentTilemap(tilemap`level11`)
    } else if (level == 15) {
        tiles.setCurrentTilemap(tilemap`level4`)
        sign = "lvl 15. because why not"
    } else if (level == 16) {
        tiles.setCurrentTilemap(tilemap`level28`)
        sign = "lvl 16. more backwards"
    } else if (level == 17) {
        tiles.setCurrentTilemap(tilemap`level29`)
        sign = "lvl 17. red is bad"
    } else if (level == 18) {
        tiles.setCurrentTilemap(tilemap`level30`)
        sign = "lvl 18. This is a-maz-ing"
    } else if (level == 19) {
        tiles.setCurrentTilemap(tilemap`level5`)
    } else if (level == 20) {
        tiles.setCurrentTilemap(tilemap`level24`)
        killsneaded = 5
        BOSSBattle = true
        sign = "lvl 20. destroy the the orange orbs (they kill you if they are moving)"
    } else if (level == 21) {
        tiles.setCurrentTilemap(tilemap`level18`)
        Make_thumper()
    } else if (level == 22) {
        tiles.setCurrentTilemap(tilemap`level12`)
        Make_thumper()
    } else if (level == 23) {
        tiles.setCurrentTilemap(tilemap`level21`)
        Make_thumper()
    } else if (level == 24) {
        tiles.setCurrentTilemap(tilemap`level32`)
        Make_thumper()
        sign = "lvl 24. Ahhh"
    } else if (level == 25) {
        tiles.setCurrentTilemap(tilemap`level33`)
        Make_thumper()
        sign = "lvl 15. Backwards with thumpers(not backwards)"
    } else if (level == 26) {
        tiles.setCurrentTilemap(tilemap`level26`)
        Make_thumper()
    } else if (level == 27) {
        tiles.setCurrentTilemap(tilemap`level31`)
        Make_thumper()
    } else if (level == 28) {
        tiles.setCurrentTilemap(tilemap`level40`)
        Make_thumper()
    } else if (level == 29) {
        tiles.setCurrentTilemap(tilemap`level36`)
        Make_thumper()
    } else if (level == 30) {
        tiles.setCurrentTilemap(tilemap`level35`)
        Make_thumper()
    } else if (level == 31) {
        tiles.setCurrentTilemap(tilemap`level44`)
        Make_thumper()
    } else if (level == 32) {
        tiles.setCurrentTilemap(tilemap`level34`)
        Make_thumper()
    } else if (level == 33) {
        tiles.setCurrentTilemap(tilemap`level47`)
        Make_thumper()
    } else if (level == 34) {
        tiles.setCurrentTilemap(tilemap`level37`)
    } else if (level == 35) {
        tiles.setCurrentTilemap(tilemap`level51`)
    } else if (level == 36) {
        tiles.setCurrentTilemap(tilemap`level49`)
    } else if (level == 37) {
        tiles.setCurrentTilemap(tilemap`level38`)
    } else if (level == 38) {
        tiles.setCurrentTilemap(tilemap`level39`)
        Make_thumper()
    } else if (level == 39) {
        tiles.setCurrentTilemap(tilemap`level41`)
        Make_thumper()
    } else if (level == 40) {
        tiles.setCurrentTilemap(tilemap`level13`)
        Make_thumper()
    } else if (level == 41) {
        tiles.setCurrentTilemap(tilemap`level25`)
        BOSSBattle = true
        killsneaded = 10
        sign = "lvl 41. Green orbs are -5 lives"
    } else if (level == 42) {
        tiles.setCurrentTilemap(tilemap`level20`)
    } else if (level == 43) {
        tiles.setCurrentTilemap(tilemap`level27`)
    } else if (level == 44) {
        tiles.setCurrentTilemap(tilemap`level7`)
        sign = "lvl 44 .Its 4 but its not as easy as you think"
    } else if (level == 45) {
        tiles.setCurrentTilemap(tilemap`level56`)
        Make_thumper()
    } else if (level == 46) {
        tiles.setCurrentTilemap(tilemap`level57`)
    } else if (level == 47) {
        tiles.setCurrentTilemap(tilemap`level58`)
    } else if (level == 48) {
        tiles.setCurrentTilemap(tilemap`level59`)
        makeBOMB()
    } else if (level == 49) {
        tiles.setCurrentTilemap(tilemap`level62`)
        makeBOMB()
    } else if (level == 50) {
        tiles.setCurrentTilemap(tilemap`level63`)
        makeBOMB()
    } else if (level == 51) {
        tiles.setCurrentTilemap(tilemap`level68`)
        Make_thumper()
    } else if (level == 52) {
        tiles.setCurrentTilemap(tilemap`level43`)
        makeBOMB()
    } else if (level == 53) {
        tiles.setCurrentTilemap(tilemap`level61`)
        gards()
    } else if (level == 54) {
        tiles.setCurrentTilemap(tilemap`level45`)
        makeBOMB()
        gards()
    } else if (level == 55) {
        tiles.setCurrentTilemap(tilemap`level42`)
        makeBOMB()
        gards()
    } else if (level == 56) {
        tiles.setCurrentTilemap(tilemap`level71`)
        make_lazers()
    } else if (level == 57) {
        tiles.setCurrentTilemap(tilemap`level72`)
        make_lazers()
    } else if (level == 58) {
        tiles.setCurrentTilemap(tilemap`level46`)
        make_lazers()
    } else if (level == 59) {
        tiles.setCurrentTilemap(tilemap`level76`)
        togle = true
        make_lazers()
    } else if (level == 60) {
        tiles.setCurrentTilemap(tilemap`level50`)
        make_lazers()
    } else if (level == 61) {
        tiles.setCurrentTilemap(tilemap`level52`)
        make_lazers()
    } else if (level == 62) {
        tiles.setCurrentTilemap(tilemap`level77`)
        togle = true
        make_lazers()
    } else if (level == 63) {
        tiles.setCurrentTilemap(tilemap`level78`)
        Make_thumper()
        gards()
    } else if (level == 64) {
        tiles.setCurrentTilemap(tilemap`level53`)
        gards()
    } else if (level == 65) {
        tiles.setCurrentTilemap(tilemap`level80`)
        Make_thumper()
        gards()
    } else if (level == 66) {
        tiles.setCurrentTilemap(tilemap`level82`)
    } else if (level == 67) {
        tiles.setCurrentTilemap(tilemap`level84`)
    } else if (level == 68) {
        tiles.setCurrentTilemap(tilemap`level83`)
        make_lazers()
        Make_thumper()
        gards()
    } else if (level == 69) {
        tiles.setCurrentTilemap(tilemap`level85`)
    } else if (level == 70) {
        tiles.setCurrentTilemap(tilemap`level54`)
    } else if (level == 71) {
        tiles.setCurrentTilemap(tilemap`level55`)
        Make_thumper()
        make_lazers()
        gards()
    } else if (level == 72) {
        tiles.setCurrentTilemap(tilemap`level88`)
        make_activated_thumper()
    } else if (level == 73) {
        tiles.setCurrentTilemap(tilemap`level66`)
        make_activated_thumper()
        Make_thumper()
        make_lazers()
    } else if (level == 74) {
        tiles.setCurrentTilemap(tilemap`level67`)
        make_activated_thumper()
        Make_thumper()
        make_lazers()
        gards()
    } else if (level == 75) {
        tiles.setCurrentTilemap(tilemap`level60`)
        Make_thumper()
        make_lazers()
        makeBOMB()
        gards()
    } else if (level == 76) {
        tiles.setCurrentTilemap(tilemap`level64`)
        killsneaded = 15
        BOSSBattle = true
    } else if (level == 77) {
        tiles.setCurrentTilemap(tilemap`level14`)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile10`)
}
sprites.onCreated(SpriteKind.bouncy, function (sprite) {
    timer.after(randint(1000, 100000), function () {
        sprites.destroy(sprite, effects.bubbles, 750)
    })
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.lazer, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.Food, sprites.dungeon.hazardLava1, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.activate, SpriteKind.Player, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile10`)
    scene.cameraShake(6, 500)
    info.changeLifeBy(-1)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile10`)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.lazer, SpriteKind.Player, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile10`)
    scene.cameraShake(6, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Thumper, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile10`)
    info.changeLifeBy(-1)
    scene.cameraShake(8, 500)
})
sprites.onCreated(SpriteKind.Food, function (sprite) {
    timer.after(7500, function () {
        for (let index = 0; index < 5; index++) {
            sprite.setFlag(SpriteFlag.Invisible, true)
            pause(500)
            sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
            pause(500)
        }
        for (let index = 0; index < 5; index++) {
            sprite.setFlag(SpriteFlag.Invisible, true)
            pause(125)
            sprite.setFlag(SpriteFlag.Invisible, false)
            pause(125)
        }
        sprites.destroy(sprite)
    })
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile9`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava1, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    Make(currentLevel)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava0, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.boss, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-5)
    scene.cameraShake(6, 500)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.activate, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.bouncy, function (sprite, otherSprite) {
    sprite.vx = (sprite.x - otherSprite.x) * randint(2.5, 15.8)
    if (controller.up.isPressed() || controller.A.isPressed()) {
        sprite.vy = (sprite.y - otherSprite.y) * randint(2.5, 15.8) + -255
    } else {
        sprite.vy = (sprite.y - otherSprite.y) * randint(2.5, 15.8)
    }
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(10)
})
scene.onOverlapTile(SpriteKind.Food, assets.tile`myTile4`, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Food, assets.tile`myTile9`, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Food, assets.tile`myTile0`, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile10`)
    info.changeLifeBy(-1)
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile0`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    info.changeLifeBy(-1)
    scene.cameraShake(6, 500)
})
sprites.onOverlap(SpriteKind.Thumper, SpriteKind.Player, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile10`)
    scene.cameraShake(6, 500)
    info.changeLifeBy(-1)
})
function makeBOMB () {
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        BOMB = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 3 1 3 . . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . 2 1 1 1 2 . . . . . 
            . . . . . . 2 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.dropBOMB)
        tiles.placeOnTile(BOMB, value)
        BOMB.setScale(1, ScaleAnchor.Middle)
        BOMB.ay = 250
    }
}
scene.onOverlapTile(SpriteKind.Food, sprites.dungeon.hazardLava0, function (sprite, location) {
    sprites.destroy(sprite)
})
function gards () {
    for (let value of tiles.getTilesByType(assets.tile`myTile17`)) {
        gard = sprites.create(img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 b c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 b c c c c b b f 
            . c 3 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d c d b c . 
            f 3 c c c d d c d d d c d d c . 
            f b c c c d d d c d d d d d f . 
            f b c c c f f b d d b b b d f . 
            f f b b f b d d b d d d d c . . 
            . f f f f d d b b d d d c . . . 
            . . . . b b b b f b b f f . . . 
            . . . . . . . f f b b b f . . . 
            `, SpriteKind.mushroom)
        tiles.placeOnTile(gard, value)
        tiles.setTileAt(value, assets.tile`myTile1`)
        gard.setVelocity(50, 0)
        animation.runImageAnimation(
        gard,
        [img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 b c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 b c c c c b b f 
            . c 3 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d c d b c . 
            f 3 c c c d d c d d d c d d c . 
            f b c c c d d d c d d d d d f . 
            f b c c c f f b d d b b b d f . 
            f f b b f b d d b d d d d c . . 
            . f f f f d d b b d d d c . . . 
            . . . . b b b b f b b f f . . . 
            . . . . . . . f f b b b f . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 b b c c c c b b f 
            . c c 3 3 b b d d d d b c c b f 
            c b 3 3 b b d d d d d d d c b f 
            c 3 3 b b d d d d d d c d d c . 
            f 3 3 c b d d c d d d c d d c . 
            f b c c c d d d c d d d d d f . 
            f b c c c d d f f b b b b d f . 
            f f b b c c f b d d b d d c . . 
            . f f f c c f d d b b d c . . . 
            . . . . . . b b b b f c . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 3 1 1 b c c . 
            . . b 3 3 3 3 3 3 1 1 1 3 c c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 1 1 3 3 3 b c c c c b b f 
            . c c 3 3 3 b b d d d c c c b f 
            c b 3 3 b b d d d d d d b c b f 
            c 3 3 c b d d d d d d d d b c . 
            f 3 c c c d d d d d d c c d c . 
            f b c c c d d c c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c f f b d d d d d c . . 
            . f f f f d d b b d d d b f . . 
            . . . . f d d d b c c f f f . . 
            `,img`
            . . . . b b b b . . . . . . . . 
            . . . b 3 3 3 3 b b b b . . . . 
            . . b b 3 3 3 3 3 1 1 b b c c . 
            . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
            . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
            . . c 3 3 3 3 3 3 3 c c c b b f 
            . c 3 3 3 3 3 b b b b c c c b f 
            c 3 3 3 3 b b d d d d d c c b f 
            c 3 3 c b d d d d d d c d c c . 
            f 3 c c c d d c d d d c d b c . 
            f b c c c d d d c d d d d d f . 
            f b c c c d d d d d b b b d f . 
            f f b b c b d d d d d d d c . . 
            . f f f f b c c d d d d f f . . 
            . . f b d d b c c f f b b f f . 
            . . f d d d b . . f f b b b f . 
            `],
        500,
        true
        )
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy += 80
})
function make_activated_thumper () {
    for (let value of tiles.getTilesByType(assets.tile`myTile32`)) {
        mySprite2 = sprites.create(img`
            . . d . . . d . . d . . . d . . 
            . d 3 d . d 3 f f 3 d . d 3 d . 
            d 3 5 2 d 2 2 2 4 2 2 d 2 5 3 d 
            . d 2 5 1 2 2 2 4 2 2 1 5 2 d . 
            . . d 1 5 2 2 2 4 2 2 5 1 d . . 
            . d 2 2 2 5 9 9 4 2 5 2 2 2 d . 
            d 3 2 2 2 2 5 e 4 5 9 2 2 2 3 d 
            . f 4 4 4 4 4 4 5 e 9 2 2 2 f . 
            . f 2 2 2 9 e 5 4 4 4 4 4 4 f . 
            d 3 2 2 2 9 5 4 e 5 2 2 2 2 3 d 
            . d 2 2 2 5 2 4 9 9 5 2 2 2 d . 
            . . d 2 5 2 2 4 2 2 2 5 2 d . . 
            . d 1 5 2 2 2 4 2 2 2 2 5 1 d . 
            d 3 5 1 d 2 2 4 2 2 2 d 1 5 3 d 
            . d 3 d . d 3 f f 3 d . d 3 d . 
            . . d . . . d . . d . . . d . . 
            `, SpriteKind.activate)
        tiles.placeOnTile(mySprite2, value)
        tiles.setTileAt(value, assets.tile`myTile1`)
    }
}
function Make_thumper () {
    for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
        smusher = sprites.create(img`
            1 2 2 2 2 2 4 5 5 4 2 2 2 2 2 1 
            2 f f f f f c d d c f f f f f 2 
            2 f f f f c b d d b c f f f f 2 
            2 f f f f c b d d b c f f f f 2 
            2 f f f c f b d d b f c f f f 2 
            2 f f f c f b d d b f c f f f 2 
            2 f f c f f b d d b f f c f f 2 
            2 f f c f f b d d b f f c f f 2 
            2 f c f f f b d d b f f f c f 2 
            2 f c f f f b d d b f f f c f 2 
            2 c f f f f b d d b f f f f c 2 
            f 2 2 2 2 2 2 2 2 2 2 2 2 2 2 f 
            d f f f f f f f f f f f f f f d 
            d d d d d d d d d d d d d d d d 
            . d d d d d d d d d d d d d d . 
            . . d . d . d . . d . d . d . . 
            `, SpriteKind.Thumper)
        tiles.placeOnTile(smusher, value)
        tiles.setTileAt(value, assets.tile`myTile1`)
    }
}
sprites.onCreated(SpriteKind.boss, function (sprite) {
    timer.after(10000, function () {
        sprites.destroy(sprite, effects.fire, 500)
    })
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile11`)
    killsneaded += -1
})
scene.onOverlapTile(SpriteKind.boss, assets.tile`myTile0`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Life, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.hearts, 500)
    info.changeLifeBy(1)
    scene.cameraShake(4, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite, location) {
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile15`)
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile4`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
scene.onOverlapTile(SpriteKind.boss, assets.tile`myTile10`, function (sprite, location) {
    sprites.destroy(sprite, effects.fire, 500)
})
sprites.onCreated(SpriteKind.Thumper, function (sprite) {
    timer.background(function () {
        while (true) {
            sprite.ay = 175
            sprite.vy = 0
            pauseUntil(() => sprite.isHittingTile(CollisionDirection.Bottom))
            scene.cameraShake(5, 250)
            pause(250)
            sprite.ay = 0
            sprite.vy = -80
            pauseUntil(() => sprite.isHittingTile(CollisionDirection.Top))
            pause(250)
        }
    })
})
let bouncy_ball: Sprite = null
let Heart: Sprite = null
let coin: Sprite = null
let orbs: Sprite = null
let smusher: Sprite = null
let mySprite2: Sprite = null
let gard: Sprite = null
let BOMB: Sprite = null
let killsneaded = 0
let toglenum = false
let togle = false
let sign = ""
let laser: Sprite = null
let BOSSBattle = false
let currentLevel = 0
let mySprite: Sprite = null
let gameon = false
mySprite = sprites.create(img`
    . . . . . . . . . . 
    . d d d d d d d d . 
    . d 6 d d d d 6 d . 
    . d d d d d d d d . 
    . d d d d d d d d . 
    . d 2 2 d d 2 2 d . 
    . d d d 2 2 d d d . 
    . d d d d d d d d . 
    . d d d d d d d d . 
    . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setScale(5, ScaleAnchor.Middle)
mySprite.setPosition(80, 77)
let Abutton = sprites.create(img`
    ..........666666666666..........
    ........6667777777777666........
    ......66677777777777777666......
    .....6677777779999777777766.....
    ....667777779966669977777766....
    ....677777799668866117777776....
    ...66777779966877861197777766...
    ...66777799668677686699777766...
    ...88777796688888888669777788...
    ...88777788888888888888777788...
    ...88977888679999997688877988...
    ...88977886777777777768877988...
    ...88997777777777777777779988...
    ...88799777777777777777711788...
    ...88679997777777777779117688...
    ..cc866679999999999999976668cc..
    .ccbc6666679999999999766666cbcc.
    .fcbcc66666666666666666666ccbcf.
    .fcbbcc666666666666666666ccbdcf.
    .f8bbbccc66666666666666cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb111ddccf.
    .f6ccccbbbddddddddddddd111dcccf.
    .f6ccccccbbddddddddddddddbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `, SpriteKind.BUTTON)
Abutton.setFlag(SpriteFlag.Invisible, false)
Abutton.setPosition(145, 103)
animation.runImageAnimation(
Abutton,
[img`
    ..........666666666666..........
    ........6667777777777666........
    ......66677777777777777666......
    .....6677777779999777777766.....
    ....667777779966669977777766....
    ....677777799668866117777776....
    ...66777779966877861197777766...
    ...66777799668677686699777766...
    ...88777796688888888669777788...
    ...88777788888888888888777788...
    ...88977888679999997688877988...
    ...88977886777777777768877988...
    ...88997777777777777777779988...
    ...88799777777777777777711788...
    ...88679997777777777779117688...
    ..cc866679999999999999976668cc..
    .ccbc6666679999999999766666cbcc.
    .fcbcc66666666666666666666ccbcf.
    .fcbbcc666666666666666666ccbdcf.
    .f8bbbccc66666666666666cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb111ddccf.
    .f6ccccbbbddddddddddddd111dcccf.
    .f6ccccccbbddddddddddddddbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `,img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ..........888888888888..........
    ........8887777777777888........
    ......88877666666666677888......
    .....8877666667777666667788.....
    ....887666667788887766666788....
    ....866666677888888996666678....
    ...88666667788877889976666688...
    ...88666677888677688877666688...
    ...88666778888888888887766688...
    ...88667788888888888888776688...
    ..cc866788866777777668887668cc..
    .ccbc8668866666666666688668cbcc.
    .fcbcc86666666666666666668ccbcf.
    .fcbbcc886666666666666688ccbdcf.
    .f8bbbccc88888888888888cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb11dddccf.
    .f6ccccbbbdddddddddddd111ddcccf.
    .f6ccccccbbddddddddddd11dbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `],
500,
true
)
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999994444499999999999999999994444444444444444444999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999444444444444444444444444444999999994444499999999999999999994444444444444444444999999999999999444449999999999999999999999999999999999999999999999
    9999999999999999444444444444444444444444444449999994444499999999999999999994444444444444444444999999999999999444449999999999999994444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444499999999999999944444444444444444444444444499999999999444449999999999999444444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444499999999999999944444444444444444444444444499999999999444449999999999994444444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444499999999999999944444999999999999999994444499999999999444449999999999444444444499999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999944444999999999999999994444499999999999444449999999994444444444499999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444444444999999999999999994444444449999999444449999999444444444444999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449999994444444444499999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449999944444444444999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449994444444444499999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449944444444444999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444444444444444499999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444444444444444999999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444444444444449999999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444444444444999999999999999999999999999999999999999
    9999999999999999444444444444444444444444444449999994444499999999999444449999999999999999999999999444449999999444444444444999999999999999999999999999999999999999
    9999999999999999444444444444444444444444449999999994444499999999999444449999999999999999999999999444449999999444444444444499999999999999999999444444444444444444
    9999999999999999444444444444444444444444449999999994444499999999999444449999999999999999999999999444449999999444444444444449999999999999999999444444444444444444
    9999999999999999444444444444444444444444449999999994444499999999999444449999999999999999999999999444449999999444444944444444999999999999999999444444444444444444
    9999999999999999444444444444444444444444444449999994444499999999999444449999999999999999999999999444449999999444449944444444499999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449994444444449999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449999444444444999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449999944444444999999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444449999999999999999999999999444449999999444449999994444444499999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999444444444999999999999999994444444449999999444449999999444444449999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999944444999999999999999994444499999999999444449999999944444444999999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999944444999999999999999994444499999999999444449999999944444444499999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999944444999999999999999994444499999999999444449999999994444444449999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999944444444444444444444444444499999999999444449999999999444444444999999999999999999999999999
    9999999999999999444449999999999999999999444449999994444499999999999999999994444444444444444444999999999999999444449999999999944444444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444444444444444449999994444444444444444444999999999999994444449999999999994444444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444444444444444449999994444444444444444444999999999999994444449999999999999444444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444444444444444449999994444444444444444444999999999999994444449999999999999944444499999999999999999999999999
    9999999999999999444444444444444444444444444449999994444444444444444449999999999999999999999999999999999999994444449999999999999994444499999999999999999999999999
    9999999999999999944444444444444444444444444499999999444444444444444449999999999999999999999999999999999999994444499999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999994444444444444444444499999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999999444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999949999999999999999999999999999999999944444444444444444444449999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444444444444499999999999999999999999999
    9999999999999999999444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999999944444444444499999999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444444444449999999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444444444444999999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444944444444499999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444994444444449999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999444444444999999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999944444444499999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999994444444449999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999444444444999999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999944444444499999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999994444444449999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999444444444999999999999999999999999
    9999999999999999999444449999999999999999999999999999999999999999999999999999999999999999999999999999999999999999944444999999999944444444499999999999999999999999
    9999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999944444999999999994444444499999999999999999999999
    9999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999944444999999999999444444499999999999999999999999
    9999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999944444999999999999944444499999999999999999999999
    9999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999944444999999999999994444499999999999999999999999
    9999999999999999999444444444444444444444444444444499999999999999999999999999999999999999999999999999999999999999944444999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
music.play(music.stringPlayable("F G B A F A D B ", 200), music.PlaybackMode.LoopingInBackground)
pauseUntil(() => controller.A.isPressed() || controller.B.isPressed())
mySprite.setScale(1, ScaleAnchor.Middle)
music.stopAllSounds()
scene.setBackgroundImage(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    `)
animation.runImageAnimation(
Abutton,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
500,
false
)
Abutton = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.BUTTON)
controller.configureRepeatEventDefaults(500, 30)
currentLevel = 1
scene.setBackgroundColor(15)
info.setLife(10)
info.setScore(0)
game.setDialogFrame(img`
    ..dddddddddddddddddddd..
    .ddbbbbbbbbbbbbbbbbbbdd.
    ddbbbbbbbbbbbbbbbbbbbbdd
    dbbbbbbbbbbbbbbbbbbbbbbd
    dbbeeeeeeeeeeeeeeeeeebbd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbeeeeeeeeeeeeeeeeeeeebd
    dbbeeeeeeeeeeeeeeeeeebbd
    dbbbbbbbbbbbbbbbbbbbbbbd
    ddbbbbbbbbbbbbbbbbbbbbdd
    .ddbbbbbbbbbbbbbbbbbbdd.
    ..dddddddddddddddddddd..
    `)
scene.setBackgroundColor(7)
if (blockSettings.exists("LEVEL") && (blockSettings.exists("LIFE") && (blockSettings.exists("SCORE") && game.ask("  proceed", "keep going")))) {
    currentLevel = blockSettings.readNumber("LEVEL")
    info.setLife(blockSettings.readNumber("LIFE"))
    info.setScore(blockSettings.readNumber("SCORE"))
} else {
    blockSettings.writeNumber("LEVEL", 1)
    blockSettings.writeNumber("SCORE", 0)
    blockSettings.writeNumber("LIFE", 10)
}
scene.setBackgroundColor(0)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite, 100, 0)
Make(currentLevel)
gameon = true
music.play(music.stringPlayable("G E A C5 A E G A ", 200), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.mushroom)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            value.setVelocity(50, 0)
            animation.runImageAnimation(
            value,
            [img`
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 3 1 1 3 b c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 3 3 3 3 3 b c c c c b b f 
                . c 3 3 3 3 b b d d d c c c b f 
                c b 3 3 b b d d d d d d b c b f 
                c 3 3 c b d d d d d d c d b c . 
                f 3 c c c d d c d d d c d d c . 
                f b c c c d d d c d d d d d f . 
                f b c c c f f b d d b b b d f . 
                f f b b f b d d b d d d d c . . 
                . f f f f d d b b d d d c . . . 
                . . . . b b b b f b b f f . . . 
                . . . . . . . f f b b b f . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 1 1 1 3 c c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 1 1 3 3 b b c c c c b b f 
                . c c 3 3 b b d d d d b c c b f 
                c b 3 3 b b d d d d d d d c b f 
                c 3 3 b b d d d d d d c d d c . 
                f 3 3 c b d d c d d d c d d c . 
                f b c c c d d d c d d d d d f . 
                f b c c c d d f f b b b b d f . 
                f f b b c c f b d d b d d c . . 
                . f f f c c f d d b b d c . . . 
                . . . . . . b b b b f c . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 3 1 1 b c c . 
                . . b 3 3 3 3 3 3 1 1 1 3 c c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 1 1 3 3 3 b c c c c b b f 
                . c c 3 3 3 b b d d d c c c b f 
                c b 3 3 b b d d d d d d b c b f 
                c 3 3 c b d d d d d d d d b c . 
                f 3 c c c d d d d d d c c d c . 
                f b c c c d d c c d d d d d f . 
                f b c c c d d d d d b b b d f . 
                f f b b c f f b d d d d d c . . 
                . f f f f d d b b d d d b f . . 
                . . . . f d d d b c c f f f . . 
                `,img`
                . . . . b b b b . . . . . . . . 
                . . . b 3 3 3 3 b b b b . . . . 
                . . b b 3 3 3 3 3 1 1 b b c c . 
                . . b 1 1 3 3 3 3 3 1 1 3 3 c c 
                . . b 1 1 3 3 3 3 3 3 3 3 3 b c 
                . . c 3 3 3 3 3 3 3 c c c b b f 
                . c 3 3 3 3 3 b b b b c c c b f 
                c 3 3 3 3 b b d d d d d c c b f 
                c 3 3 c b d d d d d d c d c c . 
                f 3 c c c d d c d d d c d b c . 
                f b c c c d d d c d d d d d f . 
                f b c c c d d d d d b b b d f . 
                f f b b c b d d d d d d d c . . 
                . f f f f b c c d d d d f f . . 
                . . f b d d b c c f f b b f f . 
                . . f d d d b . . f f b b b f . 
                `],
            200,
            true
            )
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.setVelocity(-50, 0)
            animation.runImageAnimation(
            value,
            [img`
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c b 3 1 1 3 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b 3 3 3 3 3 c . . 
                f b c c c d d d b b 3 3 3 3 c . 
                f b c b d d d d d d b b 3 3 b c 
                . c b d c d d d d d d b c 3 3 c 
                . c d d c d d d c d d c c c 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b d d b f f c c c b f 
                . . c d d d d b d d b f b b f f 
                . . . c d d d b b d d f f f f . 
                . . . f f b b f b b b b . . . . 
                . . . f b b b f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c c 3 1 1 1 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b b 3 3 1 1 c . . 
                f b c c b d d d d b b 3 3 c c . 
                f b c d d d d d d d b b 3 3 b c 
                . c d d c d d d d d d b b 3 3 c 
                . c d d c d d d c d d b c 3 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b b f f d d c c c b f 
                . . c d d b d d b f c c b b f f 
                . . . c d b b d d f c c f f f . 
                . . . . c f b b b b . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b 1 1 3 3 3 3 3 3 b b . . 
                c c c 3 1 1 1 3 3 3 3 3 3 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c c b 3 3 3 1 1 c . . 
                f b c c c d d d b b 3 3 3 c c . 
                f b c b d d d d d d b b 3 3 b c 
                . c b d d d d d d d d b c 3 3 c 
                . c d c c d d d d d d c c c 3 f 
                . f d d d d d c c d d c c c b f 
                . f d b b b d d d d d c c c b f 
                . . c d d d d d b f f c b b f f 
                . . f b d d d b b d d f f f f . 
                . . f f f c c b d d d f . . . . 
                `,img`
                . . . . . . . . b b b b . . . . 
                . . . . b b b b 3 3 3 3 b . . . 
                . c c b b 1 1 3 3 3 3 3 b b . . 
                c c 3 3 1 1 3 3 3 3 3 1 1 b . . 
                c b 3 3 3 3 3 3 3 3 3 1 1 b . . 
                f b b c c c 3 3 3 3 3 3 3 c . . 
                f b c c c b b b b 3 3 3 3 3 c . 
                f b c c d d d d d b b 3 3 3 3 c 
                . c c d c d d d d d d b c 3 3 c 
                . c b d c d d d c d d c c c 3 f 
                . f d d d d d c d d d c c c b f 
                . f d b b b d d d d d c c c b f 
                . . c d d d d d d d b c b b f f 
                . . f f d d d d c c b f f f f . 
                . f f b b f f c c b d d b f . . 
                . f b b b f f . . b d d d f . . 
                `],
            200,
            true
            )
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.activate)) {
        if (value.x - mySprite.x < 10) {
            if (value.y > mySprite.y) {
                value.ay = -500
            } else {
                value.ay = 500
            }
        }
    }
})
game.onUpdateInterval(175, function () {
    if (BOSSBattle) {
        if (currentLevel >= 34) {
            if (Math.percentChance(75)) {
                orbs = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 4 4 4 4 . . . . . . 
                    . . . . 4 4 4 5 5 4 4 4 . . . . 
                    . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                    . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                    . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                    . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                    . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                    . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                    . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                    . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                    . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                    . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                    . . . . 4 4 2 2 2 2 4 4 . . . . 
                    . . . . . . 4 4 4 4 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.Enemy)
                tiles.placeOnRandomTile(orbs, sprites.dungeon.collectibleRedCrystal)
                orbs.setVelocity(randint(-50, 50), 0)
                orbs.ay = 250
            } else {
                orbs = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 6 6 6 6 . . . . . . 
                    . . . . 6 6 6 5 5 6 6 6 . . . . 
                    . . . 7 7 7 7 6 6 6 6 6 6 . . . 
                    . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
                    . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
                    . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
                    . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
                    . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
                    . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
                    . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
                    . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
                    . . . 6 8 8 8 8 8 8 8 8 6 . . . 
                    . . . . 6 6 8 8 8 8 6 6 . . . . 
                    . . . . . . 6 6 6 6 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.boss)
                tiles.placeOnRandomTile(orbs, sprites.dungeon.collectibleRedCrystal)
                orbs.setVelocity(randint(-50, 50), 0)
                orbs.ay = 250
            }
        } else {
            orbs = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . 4 4 4 5 5 4 4 4 . . . . 
                . . . 3 3 3 3 4 4 4 4 4 4 . . . 
                . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
                . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
                . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
                . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
                . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
                . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
                . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
                . . . 4 2 2 2 2 2 2 2 2 4 . . . 
                . . . . 4 4 2 2 2 2 4 4 . . . . 
                . . . . . . 4 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(orbs, sprites.dungeon.collectibleRedCrystal)
            orbs.setVelocity(randint(-50, 50), 0)
            orbs.ay = 250
        }
    }
})
forever(function () {
    if (gameon) {
        if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`myTile8`)) {
            mySprite.ay = -500
        } else {
            mySprite.ay = 500
        }
        if (controller.up.isPressed() || controller.A.isPressed()) {
            if (mySprite.isHittingTile(CollisionDirection.Bottom) || tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`myTile29`)) {
                mySprite.vy = -225
            }
        }
        if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), sprites.swamp.swampTile0)) {
            controller.moveSprite(mySprite, 25, 0)
        } else {
            controller.moveSprite(mySprite, 100, 0)
        }
        if (killsneaded == 0) {
            currentLevel += 1
            Make(currentLevel)
        }
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile31`)) {
                mySprite.vx = 225
            } else if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile30`)) {
                mySprite.vx = -225
            } else {
                mySprite.vx = 0
            }
        }
    }
})
game.onUpdateInterval(500, function () {
    if (!(BOSSBattle)) {
        if (Math.percentChance(75)) {
            coin = sprites.create(img`
                . . b b b b . . 
                . b 5 5 5 5 b . 
                b 5 d 3 3 d 5 b 
                b 5 3 5 5 1 5 b 
                c 5 3 5 5 1 d c 
                c d d 1 1 d d c 
                . f d d d d f . 
                . . f f f f . . 
                `, SpriteKind.Food)
            tiles.placeOnRandomTile(coin, assets.tile`myTile1`)
            animation.runImageAnimation(
            coin,
            [img`
                . . b b b b . . 
                . b 5 5 5 5 b . 
                b 5 d 3 3 d 5 b 
                b 5 3 5 5 1 5 b 
                c 5 3 5 5 1 d c 
                c d d 1 1 d d c 
                . f d d d d f . 
                . . f f f f . . 
                `,img`
                . . b b b . . . 
                . b 5 5 5 b . . 
                b 5 d 3 d 5 b . 
                b 5 3 5 1 5 b . 
                c 5 3 5 1 d c . 
                c 5 d 1 d d c . 
                . f d d d f . . 
                . . f f f . . . 
                `,img`
                . . . b b . . . 
                . . b 5 5 b . . 
                . b 5 d 1 5 b . 
                . b 5 3 1 5 b . 
                . c 5 3 1 d c . 
                . c 5 1 d d c . 
                . . f d d f . . 
                . . . f f . . . 
                `,img`
                . . . b b . . . 
                . . b 5 5 b . . 
                . . b 1 1 b . . 
                . . b 5 5 b . . 
                . . b d d b . . 
                . . c d d c . . 
                . . c 3 3 c . . 
                . . . f f . . . 
                `,img`
                . . . b b . . . 
                . . b 5 5 b . . 
                . b 5 1 d 5 b . 
                . b 5 1 3 5 b . 
                . c d 1 3 5 c . 
                . c d d 1 5 c . 
                . . f d d f . . 
                . . . f f . . . 
                `,img`
                . . . b b b . . 
                . . b 5 5 5 b . 
                . b 5 d 3 d 5 b 
                . b 5 1 5 3 5 b 
                . c d 1 5 3 5 c 
                . c d d 1 d 5 c 
                . . f d d d f . 
                . . . f f f . . 
                `],
            500,
            true
            )
            coin.setVelocity(randint(-100, 100), 0)
            coin.ay = 250
        } else if (Math.percentChance(5)) {
            Heart = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f . f f f . . . . 
                . . . . f 3 3 3 f 3 3 3 f . . . 
                . . . . f 3 3 3 3 3 1 3 f . . . 
                . . . . f 3 3 3 3 3 3 3 f . . . 
                . . . . . f 3 b b b 3 f . . . . 
                . . . . . f f b b b f f . . . . 
                . . . . . . f f b f f . . . . . 
                . . . . . . . f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Life)
            Heart.setVelocity(randint(-100, 100), 0)
            Heart.ay = 250
            Heart.setBounceOnWall(true)
            animation.runImageAnimation(
            Heart,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . f f f . f f f . . . . 
                . . . . f 3 3 3 f 3 3 3 f . . . 
                . . . . f 3 3 3 3 3 1 3 f . . . 
                . . . . f 3 3 3 3 3 3 3 f . . . 
                . . . . . f 3 b b b 3 f . . . . 
                . . . . . f f b b b f f . . . . 
                . . . . . . f f b f f . . . . . 
                . . . . . . . f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . f f f f f . f f f f f . . 
                . . f f 3 3 3 f f f 3 3 3 f f . 
                . . f 3 3 3 3 3 f 3 3 3 3 3 f . 
                . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
                . . f 3 3 3 3 3 3 3 1 1 3 3 f . 
                . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
                . . f f 3 3 3 b b b 3 3 3 f f . 
                . . . f f 3 b b b b b 3 f f . . 
                . . . . f f b b b b b f f . . . 
                . . . . . f f b b b f f . . . . 
                . . . . . . f f b f f . . . . . 
                . . . . . . . f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . f f f f f f . f f f f f f . 
                . f f 3 3 3 3 f f f 3 3 3 3 f f 
                . f 3 3 3 3 3 3 f 3 3 3 3 3 3 f 
                . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
                . f 3 3 3 3 3 3 3 3 1 1 1 3 3 f 
                . f 3 3 3 3 3 b b b 1 1 1 3 3 f 
                . f 3 3 3 3 b b b b b 3 3 3 3 f 
                . f f 3 3 b b b b b b b 3 3 f f 
                . . f f 3 b b b b b b b 3 f f . 
                . . . f f b b b b b b b f f . . 
                . . . . f f b b b b b f f . . . 
                . . . . . f f b b b f f . . . . 
                . . . . . . f f b f f . . . . . 
                . . . . . . . f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            350,
            true
            )
        } else if (Math.percentChance(1)) {
            bouncy_ball = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 6 6 6 6 . . . . . . 
                . . . . 6 6 9 6 6 6 6 6 . . . . 
                . . . 6 1 1 9 6 6 6 6 6 6 . . . 
                . . 6 1 1 9 9 6 6 6 6 6 6 6 . . 
                . . 6 1 9 9 6 6 6 6 6 6 6 6 . . 
                . 6 9 9 9 6 6 6 6 6 6 6 6 6 6 . 
                . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . 
                . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . 
                . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 . 
                . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
                . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
                . . . 6 6 6 6 6 6 6 6 6 6 . . . 
                . . . . 6 6 6 6 6 6 6 6 . . . . 
                . . . . . . 6 6 6 6 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.bouncy)
            bouncy_ball.setBounceOnWall(true)
            bouncy_ball.ay = 250
            bouncy_ball.setVelocity(randint(-100, 100), 0)
        } else {
            BOMB = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . e e e e e e . . . 
                . . . . . . e e . . . . e e e . 
                . . . f f f f f f f . . . . e . 
                . . f f f f f f f f f . . . 5 . 
                . f f d f f f f f f f f . 5 2 4 
                f f d f f f f f f f f f f . 5 . 
                f f f f f f f f f f f f f . . . 
                f f f f f f f f f f f f f . . . 
                f f f f f f f f f f f f f . . . 
                f f f f f f f f f f f f f . . . 
                f f f f f f f f f f f f f . . . 
                f f f f f f f f f f f f f . . . 
                . f f f f f f f f f f f . . . . 
                . . f f f f f f f f f . . . . . 
                . . . f f f f f f f . . . . . . 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(BOMB, assets.tile`myTile1`)
            BOMB.setVelocity(randint(-100, 100), 0)
            BOMB.ay = 250
        }
    }
})
