
function is_unique_with_buffer(str) {
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

function is_unique_no_buffer(str) {
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

function is_permut(str1, str2) {
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

function urlify(str, len) {
  //run time complexity = O(n)
  //space complexity = constant
  var w = str.length - 1;
  for (var i = len - 1; i > -1; i--) {
    if (str[i] == " ") {
      str[w] = "0";
      str[w-1] = "2";
      str[w-2] = "%";
      w = w - 2;
    } else {
      str[w] = str[i];
    }
    w--;
  }
  return str;
}

function is_palindrome_permut(str) {
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

function one_away(str1, str2) {
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
