# petstore-performance-testing using JMeter

This repository contains performance reports and scripts for the site URL: https://petstore.octoperf.com. This performance testing was conducted using Apache JMeter to evaluate the system's capability to how many concurrent requests were handled and then measure its performance under different loads.

# Following tests were performed:

I’ve completed performance test on frequently used API for test site [PETSTORE](https://petstore.octoperf.com). 

**30 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 77

Total Concurrent API requested: 7920.

**60 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 141

Total Concurrent API requested: 15840.

**100 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 215

Total Concurrent API requested: 26400.

**150 Concurrent Request with 2 Loop Count**

Avg TPS for Total Samples is ~ 368

Total Concurrent API requested: 39550.

**145 Concurrent Request with 2 Loop Count observe for 60 sec**

Avg TPS for Total Samples is ~ 312

Total Concurrent API requested: 61688.

**145 Concurrent Request with 2 Loop Count observe for 120 sec**

Avg TPS for Total Samples is ~ 357

Total Concurrent API requested: 71830.

# Result
During the test execution with 150 concurrent requests, 275 requests experienced assertion fails, 94 requests experienced connection timeouts, resulting in an error rate of 1.02%.

Hold the normal load for 120 sec, during the test execution with 145 concurrent requests, 3197 requests experienced assertion fails, 510 requests experienced connection timeouts, resulting in an error rate of 9.02%.

# Summary

The performance test results indicate that the PETSTORE can handle approximately 35,000 API calls with an error rate close to zero

Hold the normal load for 120 sec test results indicate that the PETSTORE can handle approximately 70,000 API calls with an error rate close to zero
