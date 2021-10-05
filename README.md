# Arkanoid

    
## Introdution
The project is interpretation of classical NES game [Arkanoid](https://en.wikipedia.org/wiki/Arkanoid).
Built using TypeScript to render graphics on canvas element. 

[You can play online game here](https://en.wikipedia.org/wiki/Arkanoid)

![Image alt](https://github.com/YuryYuhno/TypeScript_Arkanoid/blob/main/Images/Main.png)
___

## Game features

- Bricks with different strength:
    - __Light blue__ : one hit to destroy
    - __Yellow__ : two hits to destroy
    - __Green__ : three hits to destroy
    - __Green__ : four hits to destroy
    - __Blue__ : five hits to destroy
- Different power-ups:
    - __Lengthen__ : lengthens width of bat
    - __Shrink__ : shrinks width of bat
    - __Faster__ : increases ball speed
    - __Slower__ : decreases ball speed
- Increasing level after destroying all bricks
- Increasing score for hit bricks
## HTML
Left of side of the HTML page contains main area with HTML5 canvas to draw on it, which is placed inside cell of main HTML table.

```
<canvas id="Canvas"></canvas>
```
Into the main HTML table is placed div for floating message with Help contents.
```
<div id="floatingMessage" class="contentHelp">
</div>
```

```
.contentHelp {
    display: flex;
    align-items: center;
    width: 400px;
    padding: 0.5em;
  }
 ```
___
