function TrouverUneÉtoile () {
    étoile_x = randint(-1000, 1000)
    étoile_y = randint(-1000, 1000)
}
let coord_y = false
let coord_x = false
let étoile_y = 0
let étoile_x = 0
TrouverUneÉtoile()
basic.forever(function () {
    serial.writeLine("Nouvelle lecture")
    serial.writeValue("x", input.acceleration(Dimension.X))
    if (input.acceleration(Dimension.X) > étoile_x - 200 && input.acceleration(Dimension.X) < étoile_x + 200) {
        coord_x = true
    } else {
        coord_x = false
    }
    serial.writeValue("y", input.acceleration(Dimension.Y))
    if (input.acceleration(Dimension.Y) > étoile_y - 200 && input.acceleration(Dimension.Y) < étoile_y + 200) {
        coord_y = true
    } else {
        coord_y = false
    }
    if (coord_x == true && coord_y == true) {
        serial.writeLine("Étoile trouvée!")
        basic.showIcon(IconNames.Surprised)
        basic.pause(5000)
        basic.clearScreen()
        TrouverUneÉtoile()
    }
    basic.pause(100)
})
