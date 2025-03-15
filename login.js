// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCswS4sbDQC8BCg_9olRl5IgEuQr4ApV30",
    authDomain: "agendac3-d442c.firebaseapp.com",
    projectId: "agendac3-d442c",
    storageBucket: "agendac3-d442c.firebasestorage.app",
    messagingSenderId: "676214405206",
    appId: "1:676214405206:web:89161fd423e2faac11a3f7",
    measurementId: "G-QEE870Q6MR"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Listener do formulário
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const erroMsg = document.getElementById("erro");

    erroMsg.style.display = "none"; // Reseta a mensagem de erro

    try {
        const email = `${telefone.replace(/\D/g, '')}@curso.com`;

        // Verifica se o telefone existe na coleção 'alunos' antes de tentar login
        const alunoSnapshot = await db.collection("alunos")
            .where("telefone", "==", telefone)
            .get();

        if (alunoSnapshot.empty) {
            erroMsg.textContent = "Telefone não encontrado.";
            erroMsg.style.display = "block";
            return; // Para aqui se o telefone não existe
        }

        // Caso da senha coringa "1585"
        if (senha === "1585") {
            const aluno = alunoSnapshot.docs[0].data();
            if (aluno.acesso === "Liberado") {
                const senhaFirebase = aluno.senha + "00";
                await auth.signInWithEmailAndPassword(email, senhaFirebase);
                window.location.href = "curso.html";
            } else {
                erroMsg.textContent = "Acesso bloqueado para este aluno.";
                erroMsg.style.display = "block";
            }
        } else {
            // Login normal com senha de 4 dígitos fornecida
            const senhaFirebase = senha + "00";
            await auth.signInWithEmailAndPassword(email, senhaFirebase);
            const aluno = alunoSnapshot.docs[0].data();
            if (aluno.acesso === "Liberado") {
                window.location.href = "curso.html";
            } else {
                erroMsg.textContent = "Acesso bloqueado para este aluno.";
                erroMsg.style.display = "block";
                await auth.signOut();
            }
        }
    } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
            erroMsg.textContent = "Senha incorreta.";
        } else if (error.code === "auth/invalid-email") {
            erroMsg.textContent = "Telefone inválido.";
        } else {
            erroMsg.textContent = "Erro ao fazer login. Tente novamente.";
            console.error("Erro ao fazer login:", error);
        }
        erroMsg.style.display = "block";
    }
});