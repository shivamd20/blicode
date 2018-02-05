import React, { Component } from 'react';
import './CodeArea.css';
// import AceEditor from 'react-ace';
// import 'brace/ext/language_tools';
// import 'brace/ext/searchbox';
import SettingBar from './SettingBar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import green from 'material-ui/colors/green';
import CheckIcon from 'material-ui-icons/Check';
import ErrorIcon from 'material-ui-icons/Error';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import lightBlue from 'material-ui/colors/lightBlue';

var glotlanguages = [
  "assembly", //
  // "ats",`
  // "bash",
  "c", //
  "clojure",//
  "cobol",//
  "coffeescript",//
  "cpp", //
  "crystal",
  "csharp",//
  "d",//
  "elixir", //
  "elm",//
  "erlang",//
  "fsharp",
  "go", //
  "groovy",//
  "haskell",//
  "idris",
  "java",//
  "javascript",//
  "julia", //
  "kotlin", //
  "lua", //
  "mercury",
  "nim",
  "ocaml",//
  "perl", //
  "perl6", //
  "php",//
  "python",  //
  "ruby",//
  "rust",//
  "scala",//
  "swift",//
  "typescript" //
];

const languages = [
  'javascript',
  'java',
  'python',
  // 'xml',
  'ruby',
  //  'sass',
  //  'markdown',
  //  'mysql',
  // 'json',
  //  'html',
  //  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  // 'css',
  'c_cpp',
  'assembly_x86',
  'clojure',
  'cobol',
  'coffee',
  'd',
  'elm',
  'erlang',
  'groovy',
  'haskell',
  'julia',
  'kotlin',
  'lua',
  'ocaml',
  'perl',
  'php',
  'rust',
  'scala',
  'swift',
]

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
]


// languages.forEach((lang) => {
//   require(`brace/mode/${lang}`)
//   require(`brace/snippets/${lang}`)
// })


// themes.forEach((theme) => {
//   require(`brace/theme/${theme}`)
// })
class CodeArea extends Component {

  changeEditorLanguage(language) {

    switch (language) {


      case "assembly":
        this.setState({
          mode: "assembly_x86"
        });

        break; //
      // "ats": break;
      // "bash": break;
      case "c":
        this.setState({
          mode: "c_cpp"
        });
        break; //
      case "clojure":
        this.setState({
          mode: "clojure"
        });
        break;//
      case "cobol":
        this.setState({
          mode: "cobol"
        });

        break;//
      case "coffeescript":
        this.setState({
          mode: "coffee"
        });
        break;//
      case "cpp":
        this.setState({
          mode: "c_cpp"
        });
        break; //
      //  case "crystal": 
      //  this.setState({
      //   mode:"c_cpp"
      // });
      //  break;
      case "csharp":
        this.setState({
          mode: "csharp"
        });
        break;//
      case "d":
        this.setState({
          mode: "d"
        });
        break;//
      case "elixir":
        this.setState({
          mode: "elixir"
        });
        break; //
      case "elm":
        this.setState({
          mode: "elm"
        });
        break;//
      case "erlang":
        this.setState({
          mode: "erlang"
        });
        break;//
      //  case "fsharp":
      //  this.setState({
      //   mode:"c_cpp"
      // });
      //  break;
      case "go":
        this.setState({
          mode: "golang"
        });
        break; //
      case "groovy":
        this.setState({
          mode: "groovy"
        });
        break;//
      case "haskell":
        this.setState({
          mode: "haskell"
        });
        break;//
      // case "idris": break;
      case "java":
        this.setState({
          mode: "java"
        });
        break;//
      case "javascript":
        this.setState({
          mode: "javascript"
        });
        break;//
      case "julia":
        this.setState({
          mode: "julia"
        });
        break; //
      case "kotlin":
        this.setState({
          mode: "kotlin"
        });
        break; //
      case "lua":
        this.setState({
          mode: "lua"
        });
        break; //
      // case "mercury": break;


      // case "nim": break;
      case "ocaml":
        this.setState({
          mode: "ocaml"
        });
        break;//
      case "perl":
        this.setState({
          mode: "perl"
        });
        break; //
      case "perl6":
        this.setState({
          mode: "perl"
        });
        break; //
      case "php":
        this.setState({
          mode: "php"
        });
        break;//
      case "python":
        this.setState({
          mode: "python"
        });
        break;  //
      case "ruby":
        this.setState({
          mode: "ruby"
        });
        break;//
      case "rust":
        this.setState({
          mode: "rust"
        });
        break;//
      case "scala":
        this.setState({
          mode: "scala"
        });
        break;//
      case "swift":
        this.setState({
          mode: "swift"
        });
        break;//
      case "typescript":
        this.setState({
          mode: "typescript"
        });
        break; //    
    }

  }
  state = {

    theme: 'monokai',
    mode: 'java',
    fontSize: 14,
    customIp: false
  };



  render() {

    return <div>

      <SettingBar
        fontSize={this.state.fontSize}
        lang={this.props.language}
        theme={this.state.theme}
        onLangChange={(value) => {
          this.setState({
            language: value.target.value
          })


          this.props.onLanguageChange(value.target.value);

          this.changeEditorLanguage(value.target.value)
        }}



      />

      <button onClick={() => {
        this.setState({
          editorFilter: this.state.editorFilter ? undefined : 'blur(5px)'
        });
      }}>

        toggle blur

 </button>

      {
        // editor
      }

      <br />
      <TextField
        style={{
          width: '95vw',
          height: '500px',
          filter: this.state.editorFilter,
          backgroundColor :'lightGray'
        }}

        onChange={this.props.onCodeChange}

        value={this.props.code}

        onKeyDown={(e) => {
          if (e.keyCode == 9 || e.which == 9) {
            e.preventDefault();
            var s = e.target.selectionStart;
            e.target.value = e.target.value.substring(0, e.target.selectionStart) + "\t" + e.target.value.substring(e.target.selectionEnd);
            e.target.selectionEnd = s + 1;
          }
        }}
        multiline = {true  }
        rows = {35}
        ma

      ></TextField>


      <Typography >

        <TextField
          id="name"
          label="File Name"
          value={this.props.fileName}
          // onChange={(e)=>{
          //   this.setState({
          //     filename:e.target.value
          //   });
          // }}



          onChange={this.props.onFileNameChange}

          margin="normal"
        />

<span di>
Custom Input  <Switch
          checked={this.state.customIp}
          onChange={()=>{

            this.setState({
              customIp : !this.state.customIp
            })
          }}
          aria-label="Custom Input"
        > </Switch>
</span>
        {

       <TextField
          id="name"
          label="Input"
          value={this.props.input}
          multiline={true}
          hidden = {this.state.customIp}
          autoCapitalize="none" autoCorrect="off" autoComplete="off"
          // onChange={(e)=>{
          //   this.setState({
          //     input:e.target.value
          //   });
          // }}
          disabled = {!this.state.customIp}
          rowsMax={5}
          style={{
            maxWidth : '100%'
          }}

          onChange={this.props.onInputChange}
          margin="normal"

        /> }


      </Typography>

    </div>
  }


}


export default CodeArea;