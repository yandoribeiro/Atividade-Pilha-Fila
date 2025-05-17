// Definine aa classe fila
class Fila {
    constructor() {
        this.itens = [];
    }

    entrarNaFila(item) {
        this.itens.push(item);
    }

    atenderProximo() {
        if (this.estaVazia()) {
            return null;
        }
        return this.itens.shift();
    }

    proximo() {
        if (this.estaVazia()) {
            return null;
        }
        return this.itens[0];
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    tamanho() {
        return this.itens.length;
    }

    imprimir() {
        console.log(this.itens.join(', '));
    }
}

// Define a classe filha
class Pilha {
    constructor() {
        this.itens = [];
    }

    empilhar(item) {
        this.itens.push(item);
    }

    desempilhar() {
        if (this.estaVazia()) {
            return null;
        }
        return this.itens.pop();
    }

    topo() {
        if (this.estaVazia()) {
            return null;
        }
        return this.itens[this.itens.length - 1];
    }

    estaVazia() {
        return this.itens.length === 0;
    }

    tamanho() {
        return this.itens.length;
    }

    imprimir() {
        console.log(this.itens.join(', '));
    }
}

//  Define a classe para o sistema de atendimento hospitalar
class SistemaHospitalar {
    constructor() {
        this.filaAtendimento = new Fila();
        this.pilhaProntuarios = new Pilha();
    }

    // Adiciona pacientes à fila de atendimento
    adicionarPacientes(...nomes) {
        nomes.forEach(nome => this.filaAtendimento.entrarNaFila(nome));
        console.log(`Pacientes adicionados: ${nomes.join(', ')}`);
    }

    // Mostra o próximo paciente a ser atendido
    mostrarProximoPaciente() {
        const proximo = this.filaAtendimento.proximo();
        if (proximo) {
            console.log(`Próximo paciente: ${proximo}`);
        } else {
            console.log("Não há pacientes na fila de atendimento.");
        }
        return proximo;
    }

    // Atende um paciente
    atenderPaciente() {
        const pacienteAtendido = this.filaAtendimento.atenderProximo();
        if (pacienteAtendido) {
            this.pilhaProntuarios.empilhar(pacienteAtendido);
            console.log(`Paciente atendido: ${pacienteAtendido}`);
        } else {
            console.log("Não há pacientes para atender.");
        }
        return pacienteAtendido;
    }

    // Mostra o estado atual da fila e da pilha
    statusAtendimento() {
        console.log("\n--- Status do Atendimento ---");
        console.log("Fila de atendimento:");
        this.filaAtendimento.imprimir();
        console.log("Pilha de prontuários:");
        this.pilhaProntuarios.imprimir();
        console.log("-----------------------------\n");
    }

    // Buscar paciente na pilha de prontuários
    buscarProntuario(nome) {
        const tempPilha = new Pilha();
        let encontrado = false;
        let posicao = 0;

        // Desempilhar até encontrar o paciente
        while (!this.pilhaProntuarios.estaVazia()) {
            const paciente = this.pilhaProntuarios.desempilhar();
            tempPilha.empilhar(paciente);
            posicao++;

            if (paciente === nome) {
                encontrado = true;
                break;
            }
        }

        // Reempilhar os prontuários
        while (!tempPilha.estaVazia()) {
            this.pilhaProntuarios.empilhar(tempPilha.desempilhar());
        }

        if (encontrado) {
            console.log(`Prontuário de ${nome} encontrado na posição ${posicao} da pilha.`);
            return posicao;
        } else {
            console.log(`Prontuário de ${nome} não encontrado.`);
            return -1;
        }
    }

    // Reiniciar a simulação
    reiniciarSimulacao() {
        this.filaAtendimento = new Fila();
        this.pilhaProntuarios = new Pilha();
        console.log("Simulação reiniciada. Fila e pilha zeradas.");
    }
}

// Cria a simulação do sistema
const hospital = new SistemaHospitalar();

// Adiciona 5 pacientes à fila
hospital.adicionarPacientes("Christian", "João", "Felipe", "Rafael", "Bruno");

// Mostra quem será o próximo a ser atendido
hospital.mostrarProximoPaciente();

// Simula o atendimento de dois pacientes
hospital.atenderPaciente();
hospital.atenderPaciente();

// Imprimi a fila restante e a pilha de prontuários
hospital.statusAtendimento();

// Busca um prontuário específico
hospital.buscarProntuario("João"); // Deve encontrar
hospital.buscarProntuario("Yan"); // Não deve encontrar

// Reinicia a simulação
hospital.reiniciarSimulacao();
hospital.statusAtendimento();