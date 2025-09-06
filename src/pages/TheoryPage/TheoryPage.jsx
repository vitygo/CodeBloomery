import React, { useState, useEffect, useRef } from "react";
import { FaPython, FaPlayCircle, FaLightbulb, FaCode, FaBook } from "react-icons/fa";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import "./TheoryPage.css";

const theoryData = {
  Variables: {
    title: "Variables in Python",
    intro: "In Python, a variable is a named storage location that holds a value. Think of it as a label you attach to a piece of data to easily reference it later. Unlike many other programming languages, Python is **dynamically typed**, meaning you don't need to specify the variable's data type when you create it; the interpreter figures it out for you.",
    details: [
   "**Naming Rules:** Variable names must begin with a letter (a-z, A-Z) or an underscore (`_`). After the first character, they can contain letters, numbers (0-9), and underscores.",
      "**Dynamic Typing:** Python automatically assigns a data type (like integer, string, or boolean) to the variable based on the value it's given. This makes the language flexible and easy to use.",
      "**Case Sensitivity:** Variable names are case-sensitive. For example, `my_name`, `My_name`, and `MY_NAME` are considered three different variables.",
      "**Data Storage:** Variables can store various data types, including numbers (`int`, `float`), text (`str`), boolean values (`True`/`False`), and complex data structures like lists, tuples, and dictionaries.",
      "**Mutability:** Variables are **mutable**, which means you can change the value stored in them at any point after they have been created. This allows for dynamic data manipulation within your programs.",
      "**Best Practices:** Use descriptive and meaningful variable names (e.g., `user_age` instead of `ua`) to make your code more readable and understandable for both yourself and others.",
      "**Naming Rules:** Variable names must begin with a letter (a-z, A-Z) or an underscore (`_`). After the first character, they can contain letters, numbers (0-9), and underscores.",
      "**Dynamic Typing:** Python automatically assigns a data type (like integer, string, or boolean) to the variable based on the value it's given. This makes the language flexible and easy to use.",
      "**Case Sensitivity:** Variable names are case-sensitive. For example, `my_name`, `My_name`, and `MY_NAME` are considered three different variables.",
      "**Data Storage:** Variables can store various data types, including numbers (`int`, `float`), text (`str`), boolean values (`True`/`False`), and complex data structures like lists, tuples, and dictionaries.",
      "**Mutability:** Variables are **mutable**, which means you can change the value stored in them at any point after they have been created. This allows for dynamic data manipulation within your programs.",
      "**Best Practices:** Use descriptiv"
    ],
    codeExample: "# Assigning different data types to variables\nage = 30\nname = 'Alice'\nis_student = True\n\n# Printing the values and their types\nprint(age)           # Output: 30\nprint(type(age))     # Output: <class 'int'>\n\nprint(name)          # Output: Alice\nprint(type(name))    # Output: <class 'str'>\n\n# Reassigning a new value to an existing variable\nage = 31\nprint(age)           # Output: 31"
  }
};

export default function TheoryPage({ topic = "Variables", sectionId }) {
  const data = theoryData[topic] || theoryData.Variables;
  const [terminalOutput, setTerminalOutput] = useState([
    ">> Welcome! Press Run Code to execute the example."
  ]);
  const [pyodide, setPyodide] = useState(null);
  const editorRef = useRef(null);
  const editorViewRef = useRef(null);

  // ініціалізація CodeMirror
  useEffect(() => {
    if (editorRef.current && !editorViewRef.current) {
      const state = EditorState.create({
        doc: data.codeExample,
        extensions: [
          keymap.of(defaultKeymap),
          python(),
          oneDark,
          lineNumbers(),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              // код можна відслідковувати тут
            }
          })
        ]
      });
      editorViewRef.current = new EditorView({ state, parent: editorRef.current });
    }
  }, [data.codeExample]);

  // завантаження Pyodide
  useEffect(() => {
    const load = async () => {
      if (!window.loadPyodide) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }
      const py = await window.loadPyodide({ stdout: console.log });
      setPyodide(py);
    };
    load();
  }, []);

  const runCode = async () => {
    if (!pyodide || !editorViewRef.current) {
      alert("Pyodide is still loading, please wait...");
      return;
    }

    const code = editorViewRef.current.state.doc.toString();

    try {
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      await pyodide.runPythonAsync(code);

      const out = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      const err = await pyodide.runPythonAsync("sys.stderr.getvalue()");

      let lines = [];
      if (out) lines = lines.concat(out.trim().split("\n"));
      if (err) lines = lines.concat(err.trim().split("\n"));

      setTerminalOutput(lines.length ? lines : ["No output"]);
    } catch (e) {
      setTerminalOutput(["Error: " + e.toString()]);
    }
  };

  return (
    <div className="theory-page">
      <h1 className="theory-title">
        <FaBook /> {data.title}
      </h1>
      <p className="theory-section">Section: {sectionId}</p>

      <section className="theory-intro">
        <h2>
          <FaLightbulb /> Introduction
        </h2>
        <p>{data.intro}</p>
      </section>

      <section className="theory-details">
        <h2>
          <FaPython /> Details
        </h2>
        <ul>
          {data.details.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="theory-code">
        <h2>
          <FaCode /> Example Code
        </h2>
        <div ref={editorRef} className="code-editor-cm" />
        <button className="run-button" onClick={runCode}>
          <FaPlayCircle /> Run Code
        </button>
        <div className="terminal-output">
        <div className="terminal-header">Terminal Output</div>
        <div className="terminal-content">
          {terminalOutput.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>
      </section>

     
    </div>
  );
}
