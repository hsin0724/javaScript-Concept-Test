/*
實作 Fibonacci number (費式數列)
建立函式 fibonacci 代入參數 position，position 表示的是想要得到 
fibonacci sequence 中的第幾個數字的值。

fibonacci(0) // 0
fibonacci(1) // 1
fibonacci(2) // 1
fibonacci(3) // 2
fibonacci(4) // 3
*/

function fibonacci(position){

    // input : number
    // output : number

    let firstNumber = 0;
    let secondNumber = 1;
    let result;

    if(position == 0){

        result = firstNumber;

    } else if(position == 1){

        result = secondNumber;

    } else {

        for (let i = 2; i <= position; i++){

            result = firstNumber + secondNumber;
            firstNumber = secondNumber;
            secondNumber = result;

        }
    }

    return result;
    
}

console.log(fibonacci(7));


//--------------------------------------------------------------

/*
使用 Linked List 實作 Stack
實作需包含以下方法。
push() : 添加新元素。
pop()：移除元素並返回被移除的元素。
size()：返回所有元素數量。

const myStack = new Stack()
myStack.push(1)
myStack.push(2)
myStack.push(3)
myStack.pop() // 3
myStack.size() // 2
*/

class Node {

    constructor(data) {

        this.data = data;
        this.next = null;

    }

}

class Stack {

    constructor() {

        this.head = null;
        this.length = 0;

    }

    push(data) {

        let newNode = new Node(data);

        // 如果為 first node
        if(this.head == null) {

            this.head = newNode;

        } else {

            let currentNode = this.head;

            while(currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = newNode;

        }

        this.length++;
    }


    pop() {

        let currentNode = this.head;
        let previousNode;

        while(currentNode.next) {

            previousNode = currentNode;
            currentNode = currentNode.next;

        }

        previousNode.next = null;
        this.length--;
        return currentNode.data;
    }


    size() {
        return this.length;
    }

}


const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.pop();
myStack.size();


//--------------------------------------------------------------

/*
實作 Data Transformer
將下列輸入資料整合成期望的輸出結果。
輸入資料：
const userIds = ['U01', 'U02', 'U03']
const orderIds = ['T01', 'T02', 'T03', 'T04']
const userOrders = [
{ userId: 'U01', orderIds: ['T01', 'T02'] },
{ userId: 'U02', orderIds: [] },
{ userId: 'U03', orderIds: ['T03'] },
]
const userData = { 'U01': 'Tom', 'U02': 'Sam', 'U03': 'John' }
const orderData = {
'T01': { name: 'A', price: 499 },
'T02': { name: 'B', price: 599 },
'T03': { name: 'C', price: 699 },
'T04': { name: 'D', price: 799 },
}
輸出結果：
const result = [
{
user: { id: 'U01', name: 'Tom' },
orders: [
    { id: 'T01', name: 'A', price: 499 },
    { id: 'T02', name: 'B', price: 599 },
    ],
},
...,
]
*/

const userIds = ['U01', 'U02', 'U03'];
const orderIds = ['T01', 'T02', 'T03', 'T04']
const userOrders = [
    { userId: 'U01', orderIds: ['T01', 'T02'] },
    { userId: 'U02', orderIds: [] },
    { userId: 'U03', orderIds: ['T03'] },
];
const userData = { 'U01': 'Tom', 'U02': 'Sam', 'U03': 'John' };
const orderData = {
    'T01': { name: 'A', price: 499 },
    'T02': { name: 'B', price: 599 },
    'T03': { name: 'C', price: 699 },
    'T04': { name: 'D', price: 799 },
};

function dataTransformer(userIds, userOrders, userData, orderData){

    let result = [];

    // 每一個 user 
    for(let i = 0; i < userIds.length; i++){

        let user = {};
        let orders = [];

        user.id = userIds[i];
        user.name = userData[user.id];

        let filteredOrders = userOrders.filter(d => d.userId === user.id); //[{ userId: 'U01', orderIds: ['T01', 'T02'] }]
        filteredOrders = filteredOrders[0].orderIds; // U01 => ["T01","T02"]

        // 此 user 的每一個 order
        for (let j = 0; j < filteredOrders.length; j++){

        	let order = {};
            order.id = filteredOrders[j];
            order.name = orderData[order.id].name;
            order.price = orderData[order.id].price;
            orders.push(order);
           
        };

        result.push({orders, user});
        
    }

    return result;
}

result = dataTransformer(userIds, userOrders, userData, orderData);
console.log(result);


//--------------------------------------------------------------

/*
擇一實作 Debounce 或 Throttle
debounce 是在delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。
throttle 在觸發後的 timeout 時間內只會執行一次。
建立函式 debounce 或 throttle 帶入參數如下範例：
const debounceFunc = debounce(func, delay)
const throttleFunc = throttle(func, timeout)
*/

function debounce(func, delay) {

    let timeout = null;

    return function (){

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);

    }
}

const debounceFunc = debounce(func, delay);

//--------------------------------------------------------------

/*
(加分題) 使用 Event Loop 結合實際操作範例擇一敘述 Debounce 或 Throttle 的運
作方式
如文字輸入、scroll 操作與 button 連續點擊，或是其他可結合 Debounce 或 Throttle
的行為都可以拿來當作操作範例。
*/

/*
範例說明 : 
(1)抓取ID為submit的按鈕並設變數為btnSubmit
(2)監聽btnSubmit是否被點擊，點擊的話則呼叫debounceFunc()
(3)被呼叫的debounceFunc()執行debounce(submit, 2000)
(4)在設定的時間內一直重覆觸發function則會執行clearTimeout()並重新計時, 
   如觸發過2秒後才會執行setTimeout()裡的程式
*/
  

let btnSubmit = document.getElementById('submit');

btnSubmit.addEventListener('click', () => { 
    console.log('click btn');
debounceFunc();
});

const submit = () => { 
    console.log('submit') 
};

const debounceFunc = debounce(submit, 2000);
