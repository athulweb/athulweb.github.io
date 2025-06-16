let questions = [];
    let answers = [];

    // Load question and answer files
    Promise.all([
      fetch('questions.txt').then(res => res.text()),
      fetch('answers.txt').then(res => res.text())
    ]).then(([qText, aText]) => {
      questions = qText.split('\n').map(line => line.trim()).filter(Boolean);
      answers = aText.split('\n').map(line => line.trim()).filter(Boolean);
    }).catch(err => {
      document.getElementById('result').innerText = "❌ Failed to load files.";
      console.error("File load error:", err);
    });

    function speak(text) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = 'en-IN';
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }

    function search() {
      const input = document.getElementById('searchBox').value.trim().toLowerCase();
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = "";

      if (!input) return;

      const matches = questions
        .map((q, i) => ({ question: q, index: i }))
        .filter(obj => obj.question.toLowerCase().includes(input));

      if (matches.length === 0) {
        resultDiv.innerHTML = "<p>❌ No matches found.</p>";
        return;
      }

      matches.forEach(({ question, index }) => {
        const container = document.createElement('div');

        const qDiv = document.createElement('div');
        qDiv.className = "question";
        qDiv.innerHTML = `🔍 ${question}`;

        const aDiv = document.createElement('div');
        aDiv.className = "answer";
        aDiv.style.display = 'none';
        aDiv.innerHTML = `📜 ${answers[index]}`;

        qDiv.onclick = () => {
          const isVisible = aDiv.style.display === 'block';
          aDiv.style.display = isVisible ? 'none' : 'block';
          if (!isVisible) {
            speak(answers[index]);
          } else {
            speechSynthesis.cancel();
          }
        };

        container.appendChild(qDiv);
        container.appendChild(aDiv);
        resultDiv.appendChild(container);
      });
    }

    // Sidebar toggle logic
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });