import fs from "fs";

export default function boot($query) {
  console.log($query);
  if ($query.hash) {
    if ($query.hash.toString().trim() == "krishnateja") {
      var $data = payload($query);
      return $data;
    } else {
      return 0;
    }
  } else return 0;
}

function payload($query) {
  var $code = $query.code ? JSON.stringify($query.code) : JSON.stringify("");
  var $lang = $query.lang ? $query.lang : "";
  var $input = $query.input ? $query.input : "";
  var $c = $query.c ? $query.c : "";
  var $payload = "";

  if ($lang == "java")
    $payload =
      '{"language":"java","command":"javac Main.java && java Main ' +
      $input +
      '", "files": [{"name": "Main.java", "content": ' +
      $code +
      "}]}";
  else if ($lang == "clang" && $c == 1)
    $payload =
      '{"language":"c","command":"clang main.c  &&  ./a.out ' +
      $input +
      '", "files": [{"name": "main.c", "content": ' +
      $code +
      "}]}";
  else if ($lang == "clang" && $c == 0)
    $payload =
      '{"language":"c","command":"clang++ main.cpp && ./a.out ' +
      $input +
      '", "files": [{"name": "main.cpp", "content": ' +
      $code +
      "}]}";
  else if ($lang == "python")
    $payload =
      '{"language": "python","command":"python main.py ' +
      $input +
      '", "files": [{"name": "main.py", "content": ' +
      $code +
      "}]}";
  else if ($lang == "perl")
    $payload =
      '{"language":"perl","command":"perl main.pl ' +
      $input +
      '", "files": [{"name": "main.pl", "content": ' +
      $code +
      "}]}";
  else if ($lang == "csharp")
    $payload =
      '{"language":"csharp","command":"mcs -out:a.exe main.cs && mono a.exe ' +
      $input +
      '", "files": [{"name": "main.cs", "content": ' +
      $code +
      "}]}";
  else if ($lang == "javascript")
    $payload =
      '{"language":"javascript","command":"node main.js ' +
      $input +
      '", "files": [{"name": "main.js", "content": ' +
      $code +
      "}]}";

  // else if($lang =='assembly')
  //     $payload = '{"language":"assembly","command":"nasm -f elf64 -o a.o main.asm && ld -o a.out a.o && ./a.out '.$input.'", "files": [{"name": "main.asm", "content": '.$code.'}]}';
  // else if($lang =='ats')
  //     $payload = '{"language":"ats", "files": [{"name": "main.dats", "content": '.$code.'}]}';
  // else if($lang =='bash')
  //     $payload = '{"language":"bash", "command":"bash main.sh '.$input.'","files": [{"name": "main.sh", "content": '.$code.'}]}';
  // else if($lang =='clojure')
  //     $payload = '{"language":"clojure", "command":"java -cp /usr/share/java/clojure.jar clojure.main main.clj '.$input.'","files": [{"name": "main.clj", "content": '.$code.'}]}';
  // else if($lang =='cobol')
  //     $payload = '{"language":"cobol", "files": [{"name": "main.cob", "content": '.$code.'}]}';
  // else if($lang =='coffeescript')
  //     $payload = '{"language":"coffeescript", "command":"coffee main.coffee '.$input.'","files": [{"name": "main.coffee", "content": '.$code.'}]}';
  // else if($lang =='crystal')
  //     $payload = '{"language":"crystal", "command":"crystal run main.cr '.$input.'","files": [{"name": "main.cr", "content": '.$code.'}]}';
  // else if($lang =='d')
  //     $payload = '{"language":"d","files": [{"name": "main.d", "content": '.$code.'}]}';
  // else if($lang =='elixir')
  //     $payload = '{"language":"elixir", "command":"elixirc main.ex '.$input.'","files": [{"name": "main.ex", "content": '.$code.'}]}';
  // else if($lang =='elm')
  //     $payload = '{"language":"elm","files": [{"name": "main.elm", "content": '.$code.'}]}';
  // else if($lang =='erlang')
  //     $payload = '{"language":"erlang", "command":"escript main.erl '.$input.'","files": [{"name": "main.erl", "content": '.$code.'}]}';

  return $payload;
}
