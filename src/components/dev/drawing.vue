<template>
    <div id="div_background">

    </div>
</template>
<script setup>

let sample = []

/*
    TODO: step_id 기준으로 node 구성

    [ handle:target ] STEP_ID
    --------------------------------
     action_type : codition_status
    [-------------------------------] [handle:source]
    else

    ** 다른 서버의 job은 비동기로 돌아가는데 이건 어떻게 표기할지 고민이 필요함

    target, source handler 명명규칙 정의
    - target: current_step_id
    - source: current_step_id + index + next_step_id

    이렇게 하면 source N : target 1 형태의 edge 를 그릴 수 있음
 */


</script>
<style scoped>
#div_background {
    background: darkgray;
    width: 100%;
    height: 100%;
}
</style>