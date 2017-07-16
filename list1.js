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

//Begin book problems

function remove_dups (list) { // Problem 2.1.1
  //Remove duplicates from a singly linked list
  //run time complexity = O(n)
  //space complexity = O(n)
  if (!list.head) { return new LinkedList(); }
  var h = {};
  var n = list.head;
  h[n.value] = 1;
  while (n) {
    var k = n;
    n = n.next;
    while (n && h[n.value] == 1) {
      n = n.next;
    }
    if (n) {
      h[n.value] = 1;
    }
    k.next = n;
  }
  return list;
}

function remove_dups_no_buffer (list) { //Problem 2.1.2
  //Remove duplicates from a singly linked list without using a temporary buffer
  //run time complexity = O(n^2)
  //space complexity = constant
  if (!list.head) { return new LinkedList(); }
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
  return list;
}

function kth_to_last (val, list) {// Problem 2.2
  //Remove the kth node from the end
  //run time complexity = O(n)
  //space complexity = constant
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

function del_mid(node) {// Problem 2.3
  //Delete the specified node from the list
  //run time complexity = O(n)
  //space complexity = constant
  if (node.next == undefined) {
    node.value = undefined;
    node.next = undefined;
  } else {
    node.value = node.next.value;
    node.next = node.next.next;
  }
}

function partition(list, value) {// Problem 2.4
  //Partition a list around a given value with lower numbers appearing before
  //run time complexity = O(n)
  //space complexity = O(n)
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

function sum_lists(list1, list2) { //Problem 2.5
  //Sum two linked lists that represent an integer
  //run time complexity = O(n)
  //space complexity = O(n)
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

function is_pal(list) { //Problem 2.6
  //Checks if a linked list is a palindrome
  //run time complexity: O(n)
  //space complexity: O(n)
  var len = list.length();
  var check = undefined;
  var result = true;
  if (len < 2) {
    return true;
  }
  var n = list.head;
  for (var i = 0; i < Math.floor(len/2); i++) {
    check = new Node(n.value, check);
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

//TESTING

function test(name, result, expected) {
  if (expected != result) {
    console.log("Error with test '" + name + "'");
    console.log("Exp: " + expected);
    console.log("Res: " + result);
  }
}

/*
** Testing
*/

//2.1
var x = new LinkedList(1);
x.add([1,2,3,3,4]);
test('2.1.1.1', remove_dups(x).toString(), '1 -> 2 -> 3 -> 4');
test('2.1.2.1', remove_dups_no_buffer(x).toString(), '1 -> 2 -> 3 -> 4');
x = x.create([1,2,3,4,2,3,4,2,3,4,4,4]);
test('2.1.1.2', remove_dups(x).toString(), '1 -> 2 -> 3 -> 4');
test('2.1.2.2', remove_dups_no_buffer(x).toString(), '1 -> 2 -> 3 -> 4');
x = x.create([1,2,3,4,1]);
test('2.1.1.3', remove_dups(x).toString(), '1 -> 2 -> 3 -> 4');
test('2.1.2.3', remove_dups_no_buffer(x).toString(), '1 -> 2 -> 3 -> 4');
x = x.create([]);
test('2.1.1.4', remove_dups(x).toString(), '');
test('2.1.2.4', remove_dups_no_buffer(x).toString(), '');

//2.2
x = x.create([1,2,3,4,5]);
test('2.2.1', 3, kth_to_last(2, x));
test('2.2.2', 5, kth_to_last(0, x));
test('2.2.3', null, kth_to_last(100, x));
test('2.2.4', null, kth_to_last(-2, x));

//2.3
var z = x.create([1,2,3,4,5]);
del_mid(z.head.next.next);
test('2.3 a', '1 -> 2 -> 4 -> 5',z.toString());
del_mid(z.head);
test('2.3 b', '2 -> 4 -> 5',z.toString());

//2.4
var x = x.create([3,5,8,5,10,2,1]);
test('2.4.1','3 -> 2 -> 1 -> 5 -> 8 -> 5 -> 10',partition(x,5).toString());

//2.5
var y1 = x.create([7,1,6]);
var y2 = x.create([5,9,2]);
test ('2.5.1','9 -> 1 -> 2',sum_lists(y1,y2).toString());
var y3 = new LinkedList(1);
test ('2.5.2','6 -> 9 -> 2',sum_lists(y2,y3).toString());
var y4 = new LinkedList(9);
test ('2.5.3','6 -> 2 -> 6',sum_lists(y4,y1).toString());
test ('2.5.4','4 -> 0 -> 3',sum_lists(y4,y2).toString());

//2.6
test('len',7,x.length());
var y = new LinkedList(1);
test('2.6.1',true,is_pal(y));
y.add([1]);
test('2.6.2',true,is_pal(y));
y.add([2,2]);
test('2.6.3',false,is_pal(y));
y.add([1]);
test('2.6.4',false,is_pal(y));
y.add([2,2,1,1]);
test('2.6.5',true,is_pal(y));



