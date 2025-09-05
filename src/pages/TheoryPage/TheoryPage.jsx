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
    intro: "Variables are containers for storing data values...",
    details: [
      "Variable names must start with a letter or underscore (_).",
      "Python is dynamically typed: no need to declare the type explicitly.",
      "Variables are case-sensitive.",
      "Variables can store numbers, strings, lists, dictionaries, booleans, etc.",
      "Variables are mutable, so their values can be changed.",
      "Use meaningful names for readability."
    ],
    codeExample: `# This is a comment\nx = 10\ny = 20\nname = 'Viktor'\n\nprint(x + y)\nprint('Hello', name)`
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
