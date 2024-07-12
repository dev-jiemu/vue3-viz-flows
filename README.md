# vue3-viz-flows

### 사용자 액션 플로우차트 시각화 연습 프로젝트 (~ 2024.07.11)

#### 그동안 삽질한거 대강 정리..;;

1. 라이브러리 뭐뭐 찍먹해봤니?
```
1. baklavajs
- 개발API가 직관적이고 디자인도 이뻐서 좋았는데.... 우리 시나리오를 표현해주기엔 너무 조각조각으로밖에 안된달까.
- step 이란 큰 덩어리 안에 INIT, CURRENT, SUCC, FAIL 등의 표현이 이루어져야 하는데, 시나리오 데이터 일부 수정기능을 고려했을때 수정할 수 있는 UI를 붙일수가 없음...
- input, output interface는 있는데...? 그 안에 custom을 할수가 없네...?

2. vue-flow
- 원하는 구조를 그릴 수는 있는데 vuetify랑 css 충돌나는 미친 단점 발견(...)
- ....인줄 알았는데 너무 찍먹한 라이브러리가 많아서 vuetify 랑 충돌난게 아닌걸 발견함 ㅋㅋㅋㅋ

그 외에 Rate.js 도 있지만 baklavajs 가 가지는 단점과 유사한 편

이런것도 있음!
- https://github.com/jerosoler/Drawflow?tab=readme-ov-file
```

2. 찍먹하다 원하는 라이브러리 못찾아서 직접 그리기 시도해본 썰
   
```
이것저것 전제조건 : 아래 조건을 모두 만족하는 상태에서 UI를 표현해줄 수 있는 라이브러리를 찾았어야 함

1. 커다란 STEP 안에 여러개의 경우의 수를 모두 표현할 수 있어야 함 
2. 노드와 노드 사이 1:1 관계가 아니라 1:N, N:1, N:M 세 경우의 수를 모두 지원할수 있어야 함
3. (*** 가장 중요한거!!) 1번과 연계되는 사항인데, 사용자가 직접 노드 순서를 변경하고 노드 내 일부 데이터 수정 및 삭제 작업을 표현할 수 있어야 함 : 내가 직접 노드 내부를 커스텀마이징 할수 있어야 함
4. 기왕이면 팀 내 코드스타일을 맞추면 좋겠음. vuetify 끼얹기 가능해야함.
```
vue-flow library(https://vueflow.dev/) 가 매우매우 유사했으나... vuetify css랑 충돌나는 줄 알고 찾고 찾다 직접 그려보기도 함.

<br>

> 1. interactjs 를 활용해서 내가 v-card로 요리조리 그려본 node를 사용자가 드래그 해서 아무 위치에다 옮길 수 있도록 해봄

```
interact('.draggable').draggable({
    listeners: {
        start(event) {
            const target = event.target
            const index = target.getAttribute("data-item-id")
            const item = stepsData.value[index]

            // Initialize position attributes if not set
            if (!target.hasAttribute('data-x')) {
                target.setAttribute('data-x', item.position.x)
                target.setAttribute('data-y', item.position.y)
            }
        },
        move(event) {
            const index = event.target.getAttribute("data-item-id")

            // Update the position of the item
            const target = event.target

            // 현재 위치 가져오기
            const initialX = parseFloat(target.getAttribute('data-x')) || 0
            const initialY = parseFloat(target.getAttribute('data-y')) || 0

            // 상대 이동 거리 추가
            const x = initialX + event.dx
            const y = initialY + event.dy

            // 이동 적용
            target.style.transform = `translate(${x}px, ${y}px)`

            // 속성 업데이트
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            // 데이터 업데이트
            stepsData.value[index].position.x = x
            stepsData.value[index].position.y = y

            console.log('Updated position:', stepsData.value[index].position);
        }
    }
})
```
draggable class가 적용되어있는 component에서 사용자 마우스 move 액션이 발생할때마다 move function이 호출되는 구조

event.target을 가져와서 현재 위치와 기존에 있던 component의 위치를 계산해서 style을 적용하고 현 위치를 저장함.


처음에 위치계산을 잘못해서 이동을 하는데 compoenent가 말도 안되게 튀는 현상이 잦았는데 어찌저찌 잘 보정함.

<br>

> 2. 이동하는거 구현했으니 component들 간에 선으로 연결하기 : jsPlumb library를 활용해 직접 그려보기를 시도해봄
```
function initializeJsPlumb() {
    console.log('initializeJsPlumb')
    jsPlumbInstance.setContainer(document.querySelector(".ma-3"))

    if (stepsData.value.length > 0) {
        // TODO: item -> forEach(obj, idx) if next_step ?
        // TODO: index 체계 결정해야함
        stepsData.value.forEach((item, index) => {
            console.log('item: ', item)
            const currentNodeId = `node-${index}`
            if (item.next_step) {
                const nextStepIndex = stepsData.value.findIndex(step => step.stepName === item.next_step)
                console.log('nextStepIndex: ', nextStepIndex)
                if (nextStepIndex !== -1) {
                    const nextNodeId = `node-${nextStepIndex}`;
                    jsPlumbInstance.connect({
                        source: currentNodeId,
                        target: nextNodeId,
                        anchors: ["Right", "Left"],  // 왼쪽-오른쪽 연결
                        connector: ["Straight"],
                        endpoint: "Dot",
                        paintStyle: { stroke: "#5c96bc", strokeWidth: 2 },
                        endpointStyle: { fill: "#5c96bc", radius: 3 },
                    });
                }
            }
        })
    }
}

문제는... 선은 그렸는데 점과 점 사이의 위치를 잡으려고하다가 실패했다고 한다...
anchors 를 적용해도 안먹는걸 보니까 anchors 옵션에서 연결해주려고 하는 position을 못잡는듯 함
```
~~더 파보려다가 문득 vue-flow와 vuetify css가 정말 충돌하는게 맞나? 라는 의문이 들어 크롬 개발자 도구에서 div 하나씩 까보는데~~

~~가장 눈에띄는 파란색 css 적용되어있는 class명이 vue-flow의 클래스도, vuetify의 클래스도 아니였다는걸 발견해버리고 말았다~~

~~baklavajs 라이브러리에서 온 css였던거 같애......;;;~~
