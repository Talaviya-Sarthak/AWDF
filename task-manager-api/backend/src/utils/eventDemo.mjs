import taskEvents from '../events/taskEvents.js';
import '../events/taskListeners.js';

console.log('===============================================================');
console.log(' Practical 10: Asynchronous Event-Driven Processing Benchmark ');
console.log('===============================================================\n');

async function runDemo() {
  const simulatedTask = {
    id: '66fc9876543210fedcba4321',
    title: 'Deploy Production Release v2.4',
    priority: 'high',
    user: 'student@taskflow.dev',
  };

  console.log('[Client] Sending POST /api/tasks request to create task...');
  const requestStartTime = Date.now();

  // 1. Simulate saving to database
  await new Promise((r) => setTimeout(r, 10)); // 10ms DB write simulation
  const dbSavedTime = new Date().toISOString();
  console.log(`[Database] Task written to MongoDB at: ${dbSavedTime}`);

  // 2. Main API response sent immediately
  const apiResponseTime = new Date().toISOString();
  const apiResponseMs = Date.now() - requestStartTime;
  console.log(`\n>>> [API Response] HTTP 201 Created sent to client at: ${apiResponseTime} (${apiResponseMs} ms elapsed)`);

  // 3. Emit asynchronous event
  console.log('[API Controller] Emitting "task-created" event onto native EventEmitter bus...');
  taskEvents.emit('task-created', simulatedTask);

  console.log('\n>>> Notice: Client is already released! Background work continues asynchronously...\n');

  // Wait for background setTimeout listener to finish (1.5s delay)
  await new Promise((r) => setTimeout(r, 2000));

  console.log('\n===============================================================');
  console.log(' Demonstrating Supplementary Problem 1: task-deleted Event    ');
  console.log('===============================================================');
  const deleteResponseTime = new Date().toISOString();
  console.log(`>>> [API Response] HTTP 200 OK sent to client at: ${deleteResponseTime}`);
  taskEvents.emit('task-deleted', {
    id: simulatedTask.id,
    user: simulatedTask.user,
    timestamp: deleteResponseTime,
  });

  console.log('\n===============================================================');
  console.log(' Demonstrating Supplementary Problem 2: error Event Listener   ');
  console.log('===============================================================');
  taskEvents.emit('error', new Error('Simulated external notification API timeout'));

  console.log('\n[Process] Event loop verified non-blocking. Demo completed successfully.');
}

runDemo().catch(console.error);
