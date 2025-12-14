import { useState } from 'react';


export default function Home() {
const [username, setU] = useState('');
const [password, setP] = useState('');
const [msg, setMsg] = useState('');


async function login() {
const res = await fetch('/api/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username, password })
});


const data = await res.json();
setMsg(JSON.stringify(data));
}


return (
<div style={{ padding: 40 }}>
      <h1>Admin Login</h1>

      <input
        placeholder="Username"
        onChange={e => setU(e.target.value)}
      />

      <input
        placeholder="Password"
        onChange={e => setP(e.target.value)}
      />

      <br /><br />

      <button type="button" onClick={login}>
        Login
      </button>

      <pre>{msg}</pre>
    </div>
  );
}