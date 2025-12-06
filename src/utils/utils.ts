export const formatCurrency = (amount: number) => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `USD ${formatted}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[date.getMonth()]} ${date
    .getDate()
    .toString()
    .padStart(2, '0')},${date.getFullYear()}`;
};

export const getStatusColor = (status: string) => {
  if (status === 'successful') {
    return 'text-[#0EA163]';
  }
  if (status === 'pending') {
    return 'text-[#A77A07]';
  }
  return 'text-[#56616B]';
};

export const exportTransactionsToCSV = (transactions: any) => {
  if (!transactions) {
    return;
  }

  let normalizedTransactions: any[] = [];
  if (Array.isArray(transactions)) {
    normalizedTransactions = transactions;
  } else if (
    typeof transactions === 'object' &&
    transactions !== null &&
    'data' in transactions &&
    Array.isArray(transactions.data)
  ) {
    normalizedTransactions = transactions.data;
  } else if (
    typeof transactions === 'object' &&
    transactions !== null &&
    'transactions' in transactions &&
    Array.isArray(transactions.transactions)
  ) {
    normalizedTransactions = transactions.transactions;
  }

  if (normalizedTransactions.length === 0) {
    return;
  }

  const headers = [
    'Transaction ID',
    'Type',
    'Amount',
    'Status',
    'Date',
    'Payment Reference',
    'Product Name',
    'Name',
    'Email',
    'Country',
    'Quantity',
  ];

  const csvRows = [
    headers.join(','),
    ...normalizedTransactions.map((transaction: any) => {
      const row = [
        transaction.id || transaction.payment_reference || '',
        transaction.type || '',
        transaction.amount || 0,
        transaction.status || '',
        transaction.date || '',
        transaction.payment_reference || '',
        transaction.metadata?.product_name || '',
        transaction.metadata?.name || '',
        transaction.metadata?.email || '',
        transaction.metadata?.country || '',
        transaction.metadata?.quantity || '',
      ];

      return row
        .map((value) => {
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(',');
    }),
  ];

  const csvContent = csvRows.join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `transactions_${new Date().toISOString().split('T')[0]}.csv`
  );
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
