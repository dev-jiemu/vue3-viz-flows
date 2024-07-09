<template>
    <div class="draggable"> Draggable Element </div>
</template>
<script setup>
import interact from 'interactjs'

const position = { x: 0, y: 0 }

interact('.draggable').draggable({
    listeners: {
        start (event) {
            //console.log(event.type, event.target)
        },
        move (event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
        },
    }
})

</script>
<style>
.draggable {
    width: 25%;
    min-height: 6.5em;
    margin: 1rem 0 0 1rem;
    background-color: #29e;
    color: white;
    border-radius: 0.75em;
    padding: 4%;
    touch-action: none;
    user-select: none;
}
</style>