
function is_unique_with_buffer(str) { //Problem 1.1.1
  //Determines if a string has all unique characters
  //run time complexity = O(n)
  //space complexity = O(n)
  var h = {};
  var result = true;
  for (var i = 0; i < str.length; i++) {
    if (h[str[i]]) {
      result = false;
    } else {
      h[str[i]] = 1;
    }
  }
  return result;
}

function is_unique_no_buffer(str) { //Problem 1.1.2
  //Determines if a string has all unique characters; no temporary buffer used
  //run time complexity = O(n^2)
  //space complexity = constant
  var result = true;
  for (var i = 0; i < (str.length-1); i++) {
    for (var j = (i+1); j < str.length; j++) {
      if (str[i] == str[j]) {
        result = false;
      }
    }
  }
  return result;
}

function is_permut(str1, str2) { //Problem 1.2
  //Determines if one string is a permutation of the other
  //run time complexity = O(n + m)
  //space complexity = O(n + m)
  if (str1.length != str2.length) { return false; }
  var h = {};
  for (var i = 0; i < str1.length; i++) {
    if (h[str1[i]] == undefined) {
      h[str1[i]] = 0;
    }
    h[str1[i]]++;
  }
  for (var i = 0; i < str2.length; i++) {
    if (h[str2[i]] == undefined) {
      return false;
    }
    h[str2[i]]--;
  }
  for (var x in h) {
    if (h[x] != 0) {
      return false;
    }
  }
  return true;
}

function urlify(str, len) { //Problem 1.3
  //Replaces all spaces with "%20"
  //run time complexity = O(n)
  //space complexity = constant
  var arr = new Array(str.length);
  var w = str.length - 1
  for (var i = len - 1; i > -1; i--) {
    if (str[i] == " ") {
      arr[w] = "0";
      arr[w-1] = "2";
      arr[w-2] = "%";
      w = w - 2;
    } else {
      arr[w] = str[i];
    }
    w--;
  }
  return arr.join("");
}

function is_palindrome_permut(str) { //Problem 1.4
  //Determines if a string is a permutation of a palindrome
  //run time complexity = O(n)
  //space complexity = O(n)
  var h = {};
  var len_no_spaces = str.length;
  str = str.toLowerCase();
  for (var i = 0; i < str.length; i++) {
    if (str[i] != " ") {
      h[str[i]] = (h[str[i]] == 1) ? 0 : 1;
    } else {
      len_no_spaces--;
    }
  }
  var sum = 0;
  for (var x in h) {
    sum += h[x];
  }
  return (len_no_spaces % 2 == sum);
}

function one_away(str1, str2) { //Problem 1.5
  //Determines if second string is one edit away from the first string
  //run time complexity = O(n)
  //space complexity = constant
  if (Math.abs(str1.length - str2.length) > 1) { return false; }
  var diffs = 0;
  var iter = 0;
  if (str1.length > str2.length) {
    var tmp = str1;
    str1 = str2;
    str2 = tmp;
  }
  for (var i = 0; i < str2.length; i++) {
    if (str1.length == str2.length) {
      if (str1[i] != str2[i]) {
        diffs++;
      }
    } else {
      if (str1[iter] != str2[i]) {
        i++;
        diffs++;
      }
      iter++;
    }
  }
  return (diffs < 2);
}

function string_compression(str) { //Problem 1.6
  //String compression algorithm
  //run time complexity = O(n)
  //space complexity = O(n)
  if (str.length < 2) { return str; }
  var result = [];
  var counter = 0;
  var cur_char = str[0];
  for (var i = 0; i <= str.length; i++) {
     if (cur_char != str[i] || i == str.length) {
      result.push(cur_char);
      result.push(counter);
      counter = 1;
      cur_char = (i == str.length) ? '' : str[i];
    } else {
      counter++;
    }
  }
  return (result.length > str.length) ? str : result.join("");
}

function rotate_matrix(m) {
  //Rotate NxN matrix 90 degrees clockwise
  //run time complexity = O(n^2)
  //space complexity = constant
  if (!m.length || m.length != m[0].length) { return null; }
  for (var i = 0; i < (m.length / 2); i++) {
    for (var j = i; j < m.length - 1 - i; j++) {
      var tmp = m[i][j];
      m[i][j] = m[m.length - 2 * i - j - 1][i];
      m[m.length - 2 * i - j - 1][i] = m[m.length - i - 1][m.length - j - 1];
      m[m.length - i - 1][m.length - j - 1] = m[j][m.length - i - 1];
      m[j][m.length - i - 1] = tmp;
    }
  }
  return m;
}

function zero_matrix(m) {
  //If a cell is zero, set entire row and column to zero
  //run time complexity = O(n^2)
  //space complexity = constant
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      if (m[i][j] == 0) {
        m[i][0] = 0;
        m[0][j] = 0;
      }
    }
  }
  for (var i = 0; i < m.length; i++) {
    if (m[i][0] == 0) {
      for (var k = 1; k < m.length; k++) {
        m[i][k] = 0;
      }
    }
    if (m[0][i] == 0) {
      for (var k = 1; k < m.length; k++) {
        m[k][i] = 0;
      }
    }
  }
  return m;
}

function string_rotation(str1, str2) {
  //Detect if one string is a rotation of the other
  //run time complexity = O(n)
  //space complexity = constant
  if (str1.length != str2.length || str1 == "") { return false; }
  return is_substring(str1 + str1, str2);
}

function is_substring(big_str, small_str) {
  if (small_str.length > big_str) { return false; }
  var cur_index = 0;
  for (var i = 0; i < big_str.length; i++) {
    cur_index = (big_str[i] == small_str[cur_index]) ? cur_index + 1 : 0;
    if (cur_index >= small_str.length) {
      return true;
    }
  }
  return false;
}

//TESTING

function test(name, result, expected) {
  if (expected != result) {
    console.log("TEST " + name + " failed!");
    console.log("Exp: " + expected);
    console.log("Res: " + result);
  }
}

test('1.1.1.1',is_unique_with_buffer('abcde'),true);
test('1.1.2.1',is_unique_with_buffer('aabc'),false);
test('1.1.3.1',is_unique_with_buffer('abcdea'),false);
test('1.1.4.1',is_unique_with_buffer('abcdecfg'),false);
test('1.1.1.2',is_unique_no_buffer('abcde'),true);
test('1.1.2.2',is_unique_no_buffer('aabc'),false);
test('1.1.3.2',is_unique_no_buffer('abcdea'),false);
test('1.1.4.2',is_unique_no_buffer('abcdecfg'),false);

test('1.2.1',is_permut('abc','abc'),true);
test('1.2.2',is_permut('abc','cba'),true);
test('1.2.3',is_permut('abc','abcz'),false);
test('1.2.4',is_permut('abc','abc '),false);
test('1.2.5',is_permut('Abc','abc'),false);
test('1.2.1',is_permut(' abccc ',' cac bc'),true);

test('1.3.1',urlify('Mr John Smith    ', 13),"Mr%20John%20Smith");

test('1.4.1',is_palindrome_permut('abcba'),true);
test('1.4.2',is_palindrome_permut('abbba'),true);
test('1.4.3',is_palindrome_permut('abcbd'),false);
test('1.4.4',is_palindrome_permut('a'),true);
test('1.4.5',is_palindrome_permut('aa'),true);
test('1.4.6',is_palindrome_permut('aaa'),true);
test('1.4.7',is_palindrome_permut('a a'),true);
test('1.4.8',is_palindrome_permut(' a'),true);

test('1.5.1',one_away('yep','yep'),true);
test('1.5.2',one_away('yep','yp'),true);
test('1.5.3',one_away('yep','yeep'),true);
test('1.5.4',one_away('yp','yep'),true);
test('1.5.5',one_away('yeep','yep'),true);
test('1.5.6',one_away('pale','ple'),true);
test('1.5.7',one_away('pales','pale'),true);
test('1.5.8',one_away('pale','bale'),true);
test('1.5.9',one_away('pale','bake'),false);
test('1.5.10',one_away('',' '),true);

test('1.6.1',string_compression('aabcccccaaa'),'a2b1c5a3');
test('1.6.2',string_compression('abc'),'abc');
test('1.6.3',string_compression(''),'');

test('1.9.1',string_rotation('waterbottle','erbottlewat'),true);
test('1.9.1',string_rotation('waterbottle','erboggywato'),false);

