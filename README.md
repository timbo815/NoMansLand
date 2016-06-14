# NoMansLand

## MVP

  NoMansLand will be a JavaScript clone of the popular and classic Scorched
Earth game. At a minimum it should:

  [ ] Display a visually pleasing terrain with two opposing tanks

  [ ] Allow players to fire a shot from their tank

  [ ] Allow players to adjust the angle of their tank's barrel to change their
     shot's trajectory.

  [ ] Register hits on an opposing tank and declare a winner

## Wireframes

### Main View
  ![MainView]

### WelcomePage
  ![WelcomePage]

[MainView]: ./wireframes/MainView.png
[WelcomePage]: ./wireframes/welcomePage.png


## Implementation Timeline

### Phase One
#### Game view and basic game logic

    * Create index.html with canvas element/draw main game view
    * Create Game, GameView, Tank, and Missile classes as well as
      a Utils file for utility code
    * Add key listeners for adjusting barrel angle and firing missiles

### Phase Two
    * Fine tune physics of missile firing
    * Register hits on opposing tank

### Phase Three
    * Create welcome modal, declared winner modal, add any extras (e.g.
      landscape can be destroyed also, sounds etc.)
