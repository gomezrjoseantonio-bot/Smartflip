// Demo data initialization for Smartflip
(function(){
"use strict";

function initializeDemoData() {
  // Check if data already exists
  const existingClients = localStorage.getItem('pros');
  const existingLoans = localStorage.getItem('loans');
  
  if (existingClients && existingLoans) {
    return; // Data already exists
  }
  
  // Sample clients data
  const sampleClients = [
    {
      id: 'client_1',
      nombre: 'Ana',
      apellidos: 'García López',
      dni: '12345678A',
      email: 'ana.garcia@example.com',
      movil: '600123456',
      telefono: '600123456',
      phase: 'Búsqueda',
      created: new Date().toISOString()
    },
    {
      id: 'client_2',
      nombre: 'Carlos',
      apellidos: 'Martínez Ruiz',
      dni: '87654321B',
      email: 'carlos.martinez@example.com',
      movil: '600987654',
      telefono: '600987654',
      phase: 'Búsqueda',
      created: new Date().toISOString()
    },
    {
      id: 'client_3',
      nombre: 'María',
      apellidos: 'Rodríguez Silva',
      dni: '11223344C',
      email: 'maria.rodriguez@example.com',
      movil: '600556677',
      telefono: '600556677',
      phase: 'Búsqueda',
      created: new Date().toISOString()
    }
  ];
  
  // Sample loans data
  const sampleLoans = [
    {
      id: 'loan_1',
      clientId: 'client_1',
      concept: 'Préstamo Personal 745',
      amount: 236131.36,
      interestRate: 4.5,
      termMonths: 22,
      monthlyPayment: 11199.96,
      startDate: new Date('2023-08-29').toISOString(),
      status: 'active',
      payments: generateSamplePayments(236131.36, 4.5, 22, new Date('2023-08-29'), 6),
      notes: 'Préstamo para vivienda',
      createdAt: new Date('2023-08-29').toISOString()
    },
    {
      id: 'loan_2',
      clientId: 'client_1',
      concept: 'Préstamo Personal 974',
      amount: 172688.90,
      interestRate: 6.3,
      termMonths: 72,
      monthlyPayment: 2850.45,
      startDate: new Date('2023-01-15').toISOString(),
      status: 'active',
      payments: generateSamplePayments(172688.90, 6.3, 72, new Date('2023-01-15'), 1),
      notes: 'Préstamo para negocio',
      createdAt: new Date('2023-01-15').toISOString()
    },
    {
      id: 'loan_3',
      clientId: 'client_1',
      concept: 'Préstamo para reformas',
      amount: 75000.00,
      interestRate: 3.2,
      termMonths: 36,
      monthlyPayment: 2180.25,
      startDate: new Date('2025-08-29').toISOString(),
      status: 'active',
      payments: generateSamplePayments(75000.00, 3.2, 36, new Date('2025-08-29'), 0),
      notes: 'Renovación de cocina y baños',
      createdAt: new Date('2025-08-29').toISOString()
    }
  ];
  
  // Store the demo data
  localStorage.setItem('pros', JSON.stringify(sampleClients));
  localStorage.setItem('loans', JSON.stringify(sampleLoans));
  
  console.log('Demo data initialized for Smartflip');
}

function generateSamplePayments(principal, annualRate, months, startDate, paidCount) {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  const payments = [];
  let balance = principal;
  
  for(let i = 0; i < months; i++){
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i + 1);
    
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    
    const isPaid = i < paidCount;
    const isOverdue = !isPaid && paymentDate < new Date();
    
    payments.push({
      number: i + 1,
      date: paymentDate.toISOString(),
      amount: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      status: isPaid ? 'paid' : (isOverdue ? 'overdue' : 'pending')
    });
  }
  
  return payments;
}

function calculateMonthlyPayment(principal, annualRate, months){
  const monthlyRate = annualRate / 100 / 12;
  if(monthlyRate === 0) return principal / months;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

// Initialize demo data when script loads
initializeDemoData();

})();