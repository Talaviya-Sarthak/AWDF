import mongoose from 'mongoose';
import Task from '../models/Task.js';
import cache from './cache.js';

async function runBenchmark() {
  await mongoose.connect('mongodb://127.0.0.1:27017/task_manager');
  console.log('Successfully connected to MongoDB.\n');

  console.log('==============================================');
  console.log('  Practical 9: Cache Response Time Benchmark  ');
  console.log('==============================================\n');

  // Measure 3 Uncached Readings (MongoDB Query)
  console.log('--- Uncached Database Read (MongoDB Network + Query + Serialization) ---');
  const uncachedTimes = [];
  for (let i = 1; i <= 3; i++) {
    const start = process.hrtime();
    const tasks = await Task.find().lean();
    const [sec, nanosec] = process.hrtime(start);
    const ms = Number((sec * 1000 + nanosec / 1e6).toFixed(2));
    uncachedTimes.push(ms);
    console.log(`  Sample ${i} (Uncached): ${ms} ms (${tasks.length} tasks returned)`);
  }

  // Populate Cache
  const tasks = await Task.find().lean();
  cache.set('all_tasks', tasks);

  // Measure 3 Cached Readings (node-cache in-memory lookup)
  console.log('\n--- Cached In-Memory Read (node-cache Hash Map Lookup) ---');
  const cachedTimes = [];
  for (let i = 1; i <= 3; i++) {
    const start = process.hrtime();
    const cachedTasks = cache.get('all_tasks');
    const [sec, nanosec] = process.hrtime(start);
    const ms = Number((sec * 1000 + nanosec / 1e6).toFixed(2));
    cachedTimes.push(ms);
    console.log(`  Sample ${i} (Cached):   ${ms} ms (${cachedTasks ? cachedTasks.length : 0} tasks returned)`);
  }

  const uncachedAvg = (uncachedTimes.reduce((a, b) => a + b, 0) / uncachedTimes.length).toFixed(2);
  const cachedAvg = (cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length).toFixed(2);
  const speedup = (uncachedAvg / cachedAvg).toFixed(1);

  console.log('\n==============================================');
  console.log(`Uncached Average: ${uncachedAvg} ms`);
  console.log(`Cached Average:   ${cachedAvg} ms`);
  console.log(`Performance Gain: ${speedup}x faster response time`);
  console.log('==============================================\n');

  console.log('Cache Telemetry:', JSON.stringify(cache.getMetrics(), null, 2));

  await mongoose.disconnect();
}

runBenchmark().catch(console.error);
