(()=>{

    function random(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    } 

    function createDucks() {
       return [...Array(5)].map(()=>{
        return{
        x:random(0,window.innerWidth), //ซ้ายสุดขงจอไปยันขวาสุด
        y:window.innerHeight, //บินขึ้นจากล่างไปบน
        speedX: random(-50,50), //เป็ดบินไปซ้ายบ้างขวาบ้าง ค่าติดลบคือบินไปทางซ้าย
        speedY:random(5,10) //ไม่มีติดลบเพราะไม่ให้บินลง มีแค่ขึ้น
       };
       });
    }
    
    function setupDuckElement(duck){
        const duckElem = document.createElement('div');
        duckElem.className = 'duck'; //เชื่อมมาจาก css
        duckElem.style.left=`${duck.x}px`; //ค่าที่รับต้องเป็น px เลยต้องครอบ ${} และใส่ px ตามหลัง
        duckElem.style.top=`${duck.y}px`;
        duckElem.style.backgroundImage='url(./left-1.png)';
        document.body.appendChild(duckElem);

        return{ duck,duckElem};
        
    }

    function getDuckBackgroundImage(duck, duckElem){
        //คำสั่งนี้เป็น shortform 'if' ถ้ามันน้อยกว่า 0 คือบินซ้าย มากกว่าคือขวา
        const direction = duck.speedX >0? 'right':'left'; 
        return duckElem.style.backgroundImage.indexOf('1')!==-1?
           `url(./${direction}-2.png)`:
           `url(./${direction}-1.png)`
    }

    function moveDuck(duckElem, duck){
        const {left, top}= duckElem.getBoundingClientRect();
        const outOfBoundX=duck.x < 0 || duck.x > window.innerWidth; //เช็คว่าเป็ดหลุดขอบขวา ซ้าย ไหม
        const outOfBoundY=duck.y < 0 || duck.y > window.innerHeight; //มันหลุดขอบล่างหรือขอบบนหรือยัง

        if(outOfBoundX){
            duck.speedX*= -1; //คูณลบหนึ่ง ถ้ามันหลุดซ้ายหรือขวา ก็ให้มันบิดกลับเข้ามา

        }
        if(outOfBoundY){
            duck.speedY *=-1;
        }

        duck.x=left+duck.speedX;
        duck.y=top-duck.speedY; //ให้มันเคลื่อนขึ้นบนเรื่อยๆ
        duckElem.style.left=`${duck.x}px`; 
        duckElem.style.top=`${duck.y}px`;
    
        duckElem.style.backgroundImage= getDuckBackgroundImage(duck,duckElem);
    } 

    function shootDuck(event){
        const duckElem = event.target;
        duckElem.style.transition = 'top 2s'; //ทำอนิเมชั่น ภายใน 2 วิ จะเลื่อนจาก top อันนี้ไปถึง top อีกอัน ก้คือบรรทัดถัดไป
        duckElem.style.top =`${window.innerHeight}px`
    
        clearInterval(duckElem.interval); //เพื่อให้ interval หยุดทำงาน เมื่อโดน target
        setTimeout(() =>{
            document.body.removeChild(duckElem); //เป็นการเอาเป็ดออก

            const duck = document.querySelector('.duck'); //เป็นการเช็คว่ามีเป็ดอยุ่ไหม

            if(!duck){
                const winningElem = document.querySelector('.winning'); //ถ้าเช็คแล้วไม่มีเป็ดอยุ่ ก็จะโชว์ winning
                winningElem.style.opacity=1; //ให้มันโชว์ข้อความขึ้นมาจากตอนแรกเราซ่อนมันไว้
            }
        },2000); 
    }
    
    function run(){
        const ducks = createDucks();
        const duckElems = ducks.map(setupDuckElement)
    
        duckElems.forEach(({duck, duckElem}) =>{
          duckElem.interval = setInterval(()=>moveDuck(duckElem, duck), 100);
          duckElem.addEventListener('click', shootDuck) //เพื่อเวลาคลิกไปจะสามารถดูข้อมูลว่าคือเป็ดตัวไหน
        });
    
    }
    run();
})();