class LinkedList{
  constructor(value) {
    this.head = new Node(value);
  }

  add(arr) {
    this.head = this.head.add(arr);
  }

  create(arr) {
    var x = new LinkedList(arr[0]);
    x.head = x.head.create(arr);
    return x;
  }

  toString(){
    return this.head.toString();
  }

  disp() {
    this.head.disp();
  }

  length() {
    return this.head.length();
  }
}

class Node{
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }

  add(arr) {
    var p_first = new Node(undefined, this);
    var n = p_first.next;
    while (n.next) {
      n = n.next;
    }
    for (var i = 0; i < arr.length; i++) {
      n.next = new Node(arr[i]);
      n = n.next;
    }
    return p_first.next;
  }

  create(arr) {
    if (arr.length == 0) { return null; }
    var p_first = new Node(undefined, new Node(arr[0]));
    var n = p_first.next;
    for (var  i = 1; i < arr.length; i++) {
      n.next = new Node(arr[i]);
      n = n.next;
    }
    return p_first.next;
  }

  disp() {
    var disp = this.toString();
    console.log(disp);
  }

  toString() {
    var x = this;
    var result = [];
    while (x) {
      if (x.value != undefined) {
        result.push(x.value);
      }
      x = x.next;
    }
    result = result.join(" -> ");
    return result;
  }

  length() {
    var result = 0;
    var n = this;
    while (n) {
      if (n.value != undefined) {
        result++;
      }
      n = n.next;
    }
    return result;
  }
}

function c(arr) {
  return new LinkedList().create(arr);
}

var h = {};h['a'] = 99;for (x in h) { console.log(x); }

function remove_dups (list) {
  var n = list.head;
  while (n && n.next) {
    var r = n;
    while (r.next) {
      if (r.next.value == n.value) {
        r.next = r.next.next;
      } else {
        r = r.next;
      }
    }
    n = n.next;
  }
  return list.head;
}

function kth_to_last (val, list) {
  if (val < 0) { return null; }
  var n = list.head;
  var k = n;
  for (var i = 0; i < val; i++) {
    k = k.next;
    if (!k) {
      return null;
    }
  }
  while (k.next) {
    k = k.next;
    n = n.next;
  }
  return n.value;
}

function del_mid(node) {
  if (node.next == undefined) {
    node.value = undefined;
    node.next = undefined;
  } else {
    node.value = node.next.value;
    node.next = node.next.next;
  }
}

function partition(list, value) {
  var p_first = new Node();
  var _min = p_first;
  var iter = list.head;
  while (iter) {
    if (iter.value < value) {
      _min.next = new Node(iter.value);
      _min = _min.next;
      if (iter.next) {
        iter.value = iter.next.value;
        iter.next = iter.next.next;
      } else {
        iter.value = undefined;
        iter.next = undefined;
      }
    } else {
      iter = iter.next;
    }
  }
  _min.next = list.head;
  list.head = p_first.next;
  return list;
}

function sum_lists(list1, list2) {
  var result = undefined;
  var L1p = list1.head;
  var L2p = list2.head;
  var carry_over = 0;
  while (L1p && L2p) {
    var sum = L1p.value + L2p.value + carry_over;
    if (sum > 9) {
      sum = sum - 10;
      carry_over = 1;
    }
    result = new Node(sum,result);
    L1p = L1p.next;
    L2p = L2p.next;
  }
  var L1P = L1p;
  if (L1P) {
    L1P.value = L1P.value + carry_over;
    if (L1P.value > 9) {
      if (L1P.next) {
        L1P.next.value = L1P.next.value + 1
      } else {
        L1P.next = new Node(1);
      }
      L1P.value = L1P.value - 10;
    }
    result.next = L1P;
  }
  L1P = L2p;
  if (L1P) {
    L1P.value = L1P.value + carry_over;
    if (L1P.value > 9) {
      if (L1P.next) {
        L1P.next.value = L1P.next.value + 1
      } else {
        L1P.next = new Node(1);
      }
      L1P.value = L1P.value - 10;
    }
    result.next = L1P
  }
  return result;
}

function is_pal(list) {
  var len = list.length();
  var check = undefined;
  var result = true;
  if (len < 2) {
    return true;
  }
  var n = list.head;
  for (var i=0; i < Math.floor(len/2); i++) {
    check = new Node(n.value,check);
    n = n.next;
  }
  if (len%2 == 1) {
    n = n.next;
  }
  while (n) {
    if (n.value != check.value) {
      result = false;
    }
    n = n.next;
    check = check.next;
  }
  return result;
}

function test(name, expected, result) {
  if (expected != result) {
    console.log("Error with test '" + name + "'");
    console.log("Exp: " + expected);
    console.log("Res: " + result);
  }
}

var x = new LinkedList(1);
x.add([1,1,1,2,1,2,3,2,4,5,5,6,6,6,7,6,8,1]);
test('add','1 -> 1 -> 1 -> 1 -> 2 -> 1 -> 2 -> 3 -> 2 -> 4 -> 5 -> 5 -> 6 -> 6 -> 6 -> 7 -> 6 -> 8 -> 1',x.toString());
x = remove_dups(x);
test('rem_dups','1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8',x.toString());
var x = new LinkedList(1);
x.add([1,1,1,1,1,1,1,1]);
x = remove_dups(x);
test('rem_dups 2','1',x.toString());
var x = new LinkedList(1);
x.add([1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1]);
x = remove_dups(x);
test('rem_dups 3','1 -> 2',x.toString());

var y = new LinkedList(1);
y.add([2,3,4,5]);
test('2.2 a', 3, kth_to_last(2, y));
test('2.2 b', 5, kth_to_last(0, y));
test('2.2 c', null, kth_to_last(100, y));
test('2.2 d', null, kth_to_last(-2, y));

var z = new LinkedList(1);
z.add([2,3,4,5]);
del_mid(z.head.next.next);
test('2.3 a', '1 -> 2 -> 4 -> 5',z.toString());
del_mid(z.head);
test('2.3 b', '2 -> 4 -> 5',z.toString());

var y1 = new LinkedList(7);
y1.add([1,6]);
var y2 = new LinkedList(5);
y2.add([9,2]);
test ('2.5 a','9 -> 1 -> 2',sum_lists(y1,y2).toString());
var y3 = new LinkedList(1);
test ('2.5 b','6 -> 9 -> 2',sum_lists(y2,y3).toString());
var y4 = new LinkedList(9);
test ('2.5 c','6 -> 2 -> 6',sum_lists(y4,y1).toString());
test ('2.5 d','4 -> 0 -> 3',sum_lists(y4,y2).toString());

var x = new LinkedList(3);
x.add([5,8,5,10,2,1]);
test('2.4 a','3 -> 2 -> 1 -> 5 -> 8 -> 5 -> 10',partition(x,5).toString());

test('len',7,x.length());
var y = new LinkedList(1);
test('2.6 a',true,is_pal(y));
y.add([1]);
test('2.6 b',true,is_pal(y));
y.add([2,2]);
test('2.6 c',false,is_pal(y));
y.add([1]);
test('2.6 d',false,is_pal(y));
y.add([2,2,1,1]);
test('2.6 e',true,is_pal(y));



