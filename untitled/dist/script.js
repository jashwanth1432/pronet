// script.js

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("form");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;
      const industry = signupForm.industry.value.trim();
      const location = signupForm.location.value.trim();
      const website = signupForm.website.value.trim();
      const linkedin = signupForm.linkedin.value.trim();
      const tags = signupForm.tags.value.split(",").map(t => t.trim());
      const agree = signupForm.agree.checked;

      // Simple form validation
      if (!name || !email || !password || !industry || !location || !agree) {
        alert("Please fill in all required fields and accept terms.");
        return;
      }

      // Simulate file validation
      const portfolioInput = signupForm.portfolio;
      const file = portfolioInput.files[0];
      if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size should not exceed 5MB.");
        return;
      }

      // Simulate saving to localStorage
      const newUser = {
        name, email, industry, location, website, linkedin, tags
      };

      let users = JSON.parse(localStorage.getItem("pronet_users")) || [];
      users.push(newUser);
      localStorage.setItem("pronet_users", JSON.stringify(users));

      alert("Signup successful! (Simulated)");
      signupForm.reset();
    });
  }
});
<script>
  const chatForm = document.getElementById("chatForm");
  const messageInput = chatForm.querySelector("input");
  const chatContainer = chatForm.previousElementSibling;

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
      // Create message bubble
      const msgBubble = document.createElement("div");
      msgBubble.className = "bg-blue-100 p-3 rounded shadow w-3/4 ml-auto";
      msgBubble.innerHTML = `<p><strong>You</strong>: ${messageText}</p>`;
      chatContainer.appendChild(msgBubble);

      // Clear input
      messageInput.value = "";

      // Auto scroll
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Simulate reply
      setTimeout(() => {
        const replyBubble = document.createElement("div");
        replyBubble.className = "bg-white p-3 rounded shadow w-3/4";
        replyBubble.innerHTML = `<p><strong>Ravi K.</strong>: Got it! See you there 🎯</p>`;
        chatContainer.appendChild(replyBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1000);
    }
  });
</script>
document.addEventListener("DOMContentLoaded", function () {
    const stripe = Stripe("your-public-stripe-key-here");
    const elements = stripe.elements();
    
    const cardElement = elements.create("card", {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "'Arial', sans-serif",
            },
        },
    });

    cardElement.mount("#card-element");

    document.getElementById("payment-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            document.getElementById("card-errors").textContent = error.message;
        } else {
            document.getElementById("card-errors").textContent = "";
            processPayment(paymentMethod.id);
        }
    });

    async function processPayment(paymentMethodId) {
        const response = await fetch("/api/process-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId, plan: selectedPlan }),
        });

        const result = await response.json();
        if (result.success) {
            alert("✅ Payment Successful! You are now subscribed.");
            window.location.href = "dashboard.html";
        } else {
            alert("❌ Payment Failed. Please try again.");
        }
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    // Simulating data fetch from API
    const revenueData = {
        totalRevenue: 28490, // In USD
        activeSubscribers: 1520,
        monthlyRevenue: [3000, 4500, 5000, 6200, 7500, 8400] // Last 6 months
    };

    // Update Dashboard Stats
    document.getElementById("total-revenue").textContent = `$${revenueData.totalRevenue.toLocaleString()}`;
    document.getElementById("active-subscribers").textContent = revenueData.activeSubscribers.toLocaleString();

    // Render Revenue Growth Chart
    const ctx = document.getElementById("revenue-chart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue ($)",
                data: revenueData.monthlyRevenue,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", async function () {
    const userList = document.getElementById("user-list");
    const searchInput = document.getElementById("search-user");
    const filterRole = document.getElementById("filter-role");

    // Simulated User Data
    let users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Member" },
        { id: 2, name: "Bob Williams", email: "bob@example.com", role: "Premium" },
        { id: 3, name: "Charlie Smith", email: "charlie@example.com", role: "Admin" }
    ];

    function renderUsers() {
        userList.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="p-3">${user.name}</td>
                <td class="p-3">${user.email}</td>
                <td class="p-3">
                    <select class="role-select p-2 border rounded" data-id="${user.id}">
                        <option value="Member" ${user.role === "Member" ? "selected" : ""}>Member</option>
                        <option value="Premium" ${user.role === "Premium" ? "selected" : ""}>Premium</option>
                        <option value="Admin" ${user.role === "Admin" ? "selected" : ""}>Admin</option>
                    </select>
                </td>
                <td class="p-3">
                    <button class="suspend-btn bg-red-500 text-white px-3 py-1 rounded" data-id="${user.id}">Suspend</button>
                    <button class="delete-btn bg-gray-500 text-white px-3 py-1 rounded" data-id="${user.id}">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    // Filter & Search Users
    function filterUsers() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedRole = filterRole.value;

        let filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery)
        );

        if (selectedRole) {
            filteredUsers = filteredUsers.filter(user => user.role === selectedRole);
        }

        users = filteredUsers;
        renderUsers();
    }

    // Event Listeners
    searchInput.addEventListener("input", filterUsers);
    filterRole.addEventListener("change", filterUsers);

    // Handle Role Change
    document.addEventListener("change", function (event) {
        if (event.target.classList.contains("role-select")) {
            const userId = event.target.dataset.id;
            const newRole = event.target.value;
            users = users.map(user => user.id == userId ? { ...user, role: newRole } : user);
            renderUsers();
        }
    });

    // Handle Suspend & Delete Actions
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("suspend-btn")) {
            const userId = event.target.dataset.id;
            alert(`⚠️ User ${userId} has been suspended.`);
        }

        if (event.target.classList.contains("delete-btn")) {
            const userId = event.target.dataset.id;
            users = users.filter(user => user.id != userId);
            renderUsers();
            alert(`❌ User ${userId} has been deleted.`);
        }
    });

    // Initial Render
    renderUsers();
});
document.addEventListener("DOMContentLoaded", async function () {
    // Simulated user data
    let users = [
        { id: 1, name: "Alice", role: "Member", active: true },
        { id: 2, name: "Bob", role: "Premium", active: true },
        { id: 3, name: "Charlie", role: "Admin", active: false },
        { id: 4, name: "David", role: "Premium", active: true },
        { id: 5, name: "Emma", role: "Member", active: false }
    ];

    // Update Stats
    document.getElementById("total-users").textContent = users.length;
    document.getElementById("active-users").textContent = users.filter(user => user.active).length;
    document.getElementById("premium-users").textContent = users.filter(user => user.role === "Premium").length;

    // Chart Data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const newUsers = [5, 15, 30, 25, 40, 60];

    // Chart.js User Growth Chart
    new Chart(document.getElementById("userGrowthChart"), {
        type: "line",
        data: {
            labels: months,
            datasets: [{
                label: "New Users",
                data: newUsers,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", async function () {
    // Simulated user & revenue data
    let users = [
        { id: 1, name: "Alice", role: "Member", active: true },
        { id: 2, name: "Bob", role: "Premium", active: true },
        { id: 3, name: "Charlie", role: "Admin", active: false },
        { id: 4, name: "David", role: "Premium", active: true },
        { id: 5, name: "Emma", role: "Member", active: false }
    ];

    let revenueData = [200, 500, 1200, 1800, 2500, 4000];

    // Update Stats
    document.getElementById("total-users").textContent = users.length;
    document.getElementById("active-users").textContent = users.filter(user => user.active).length;
    document.getElementById("premium-users").textContent = users.filter(user => user.role === "Premium").length;

    // Chart.js Subscription Pie Chart
    new Chart(document.getElementById("subscriptionChart"), {
        type: "pie",
        data: {
            labels: ["Free Users", "Premium Users"],
            datasets: [{
                data: [
                    users.filter(user => user.role === "Member").length,
                    users.filter(user => user.role === "Premium").length
                ],
                backgroundColor: ["gray", "gold"]
            }]
        }
    });

    // Chart.js Revenue Line Chart
    new Chart(document.getElementById("revenueChart"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue ($)",
                data: revenueData,
                borderColor: "green",
                backgroundColor: "rgba(0, 128, 0, 0.2)",
                fill: true
            }]
        }
    });

    // Export CSV Function
    window.exportReport = function () {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Month, Revenue ($)\n";
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].forEach((month, index) => {
            csvContent += `${month}, ${revenueData[index]}\n`;
        });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Admin_Report.csv");
        document.body.appendChild(link);
        link.click();
    };
});
document.addEventListener("DOMContentLoaded", function () {
    let reports = [
        { id: 1, user: "Alice", reason: "Spamming", reportedBy: "Bob" },
        { id: 2, user: "David", reason: "Harassment", reportedBy: "Emma" },
        { id: 3, user: "Charlie", reason: "Fake Profile", reportedBy: "John" }
    ];

    let reportList = document.getElementById("report-list");

    // Populate reports table
    reports.forEach(report => {
        let row = document.createElement("tr");
        row.className = "border-b border-gray-300 dark:border-gray-600";
        row.innerHTML = `
            <td class="p-4">${report.user}</td>
            <td class="p-4">${report.reason}</td>
            <td class="p-4">${report.reportedBy}</td>
            <td class="p-4">
                <button onclick="banUser('${report.user}')" class="bg-red-600 text-white px-3 py-1 rounded">🚫 Ban</button>
                <button onclick="dismissReport(${report.id})" class="bg-green-600 text-white px-3 py-1 rounded ml-2">✅ Dismiss</button>
            </td>
        `;
        reportList.appendChild(row);
    });

    // Ban user function
    window.banUser = function (username) {
        alert(`User "${username}" has been banned.`);
    };

    // Dismiss report function
    window.dismissReport = function (reportId) {
        alert(`Report ID ${reportId} dismissed.`);
    };
});
document.addEventListener("DOMContentLoaded", function () {
    // User Growth Data
    let userGrowthCtx = document.getElementById("userGrowthChart").getContext("2d");
    new Chart(userGrowthCtx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "New Users",
                data: [500, 800, 1200, 1800, 2500, 3200],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                fill: true
            }]
        }
    });

    // Post Engagement Data
    let postEngagementCtx = document.getElementById("postEngagementChart").getContext("2d");
    new Chart(postEngagementCtx, {
        type: "bar",
        data: {
            labels: ["Likes", "Comments", "Shares"],
            datasets: [{
                label: "Total Interactions",
                data: [5000, 1200, 800],
                backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"]
            }]
        }
    });

    // Reported Cases Data
    let reportCasesCtx = document.getElementById("reportCasesChart").getContext("2d");
    new Chart(reportCasesCtx, {
        type: "doughnut",
        data: {
            labels: ["Spamming", "Harassment", "Fake Profile"],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: ["#F44336", "#FF9800", "#3F51B5"]
            }]
        }
    });
});
document.addEventListener("alpine:init", () => {
    Alpine.data("users", () => ({
        users: [
            { id: 1, name: "John Doe", email: "john@example.com", business: "Tech Co.", status: "Active" },
            { id: 2, name: "Alice Smith", email: "alice@example.com", business: "Marketing Inc.", status: "Suspended" },
            { id: 3, name: "Bob Johnson", email: "bob@example.com", business: "Finance Hub", status: "Active" }
        ],
        suspendUser(id) {
            let user = this.users.find(user => user.id === id);
            if (user) {
                user.status = "Suspended";
                alert(`User ${user.name} has been suspended.`);
            }
        },
        deleteUser(id) {
            this.users = this.users.filter(user => user.id !== id);
            alert("User deleted successfully.");
        }
    }));
});
document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById("userGrowthChart").getContext("2d");
    new Chart(ctx1, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Users",
                data: [100, 150, 220, 280, 350, 400],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true
            }]
        }
    });

    const ctx2 = document.getElementById("revenueChart").getContext("2d");
    new Chart(ctx2, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue ($)",
                data: [500, 700, 1200, 1800, 2500, 3100],
                backgroundColor: "#10B981",
                borderColor: "#10B981",
                borderWidth: 1
            }]
        }
    });
});
document.addEventListener("alpine:init", () => {
    Alpine.data("userManagement", () => ({
        users: [
            { id: 1, name: "Alice Johnson", role: "Entrepreneur", status: "Active" },
            { id: 2, name: "Bob Smith", role: "Investor", status: "Active" },
            { id: 3, name: "Charlie Brown", role: "Mentor", status: "Suspended" },
            { id: 4, name: "David White", role: "Business Owner", status: "Active" }
        ],
        search: "",
        editUser(id) {
            alert(`Edit user ${id} (Feature coming soon!)`);
        },
        toggleStatus(id) {
            this.users = this.users.map(user =>
                user.id === id ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" } : user
            );
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("subscriptionManagement", () => ({
        plans: [
            { id: 1, user: "Alice Johnson", plan: "Premium", status: "Active", amount: "$49" },
            { id: 2, user: "Bob Smith", plan: "Basic", status: "Expired", amount: "$19" },
            { id: 3, user: "Charlie Brown", plan: "Enterprise", status: "Active", amount: "$99" },
            { id: 4, user: "David White", plan: "Basic", status: "Active", amount: "$19" }
        ],
        search: "",
        editPlan(id) {
            alert(`Edit plan for user ${id} (Feature coming soon!)`);
        },
        togglePlanStatus(id) {
            this.plans = this.plans.map(plan =>
                plan.id === id ? { ...plan, status: plan.status === "Active" ? "Expired" : "Active" } : plan
            );
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("analyticsData", () => ({
        totalRevenue: 3500,
        activeSubscriptions: 120,
        expiredSubscriptions: 30,
        revenueData: [500, 700, 800, 600, 900], // Monthly revenue example
        planData: [50, 30, 40], // Example: Premium, Basic, Enterprise

        init() {
            this.loadRevenueChart();
            this.loadPlanChart();
        },

        loadRevenueChart() {
            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: 'Monthly Revenue ($)',
                        data: this.revenueData,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: { responsive: true }
            });
        },

        loadPlanChart() {
            const ctx = document.getElementById('planChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Premium', 'Basic', 'Enterprise'],
                    datasets: [{
                        data: this.planData,
                        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3']
                    }]
                },
                options: { responsive: true }
            });
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("userGrowthData", () => ({
        totalUsers: 2000,
        monthlyRegistrations: 150,
        activeUsersPercentage: 72,
        userGrowthData: [120, 90, 110, 140, 150], // Example: Monthly registrations
        industryData: [600, 400, 300, 200, 500], // Example: Tech, Finance, Healthcare, Retail, Other
        locationData: [700, 500, 400, 200, 200], // Example: New York, LA, Chicago, Miami, Houston

        init() {
            this.loadUserGrowthChart();
            this.loadIndustryChart();
            this.loadLocationChart();
        },

        loadUserGrowthChart() {
            const ctx = document.getElementById('userGrowthChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: 'New Users',
                        data: this.userGrowthData,
                        backgroundColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    }]
                },
                options: { responsive: true }
            });
        },

        loadIndustryChart() {
            const ctx = document.getElementById('industryChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tech', 'Finance', 'Healthcare', 'Retail', 'Other'],
                    datasets: [{
                        data: this.industryData,
                        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#FFC107', '#9C27B0']
                    }]
                },
                options: { responsive: true }
            });
        },

        loadLocationChart() {
            const ctx = document.getElementById('locationChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Houston'],
                    datasets: [{
                        data: this.locationData,
                        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD']
                    }]
                },
                options: { responsive: true }
            });
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("revenueData", () => ({
        totalRevenue: 125000,  // Example: Total revenue in dollars
        monthlyRevenue: 8500,  // Example: Revenue for the current month
        activeSubscribers: 580,  // Example: Active premium users
        revenueGrowthData: [6000, 7500, 8200, 7900, 8500], // Monthly revenue trend
        subscriptionData: [300, 200, 80], // Example: Free, Pro, Enterprise users

        init() {
            this.loadRevenueChart();
            this.loadSubscriptionChart();
        },

        loadRevenueChart() {
            const ctx = document.getElementById('revenueChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: this.revenueGrowthData,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: { responsive: true }
            });
        },

        loadSubscriptionChart() {
            const ctx = document.getElementById('subscriptionChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Free Plan', 'Pro Plan', 'Enterprise Plan'],
                    datasets: [{
                        data: this.subscriptionData,
                        backgroundColor: ['#FF5733', '#33FF57', '#3357FF']
                    }]
                },
                options: { responsive: true }
            });
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("userGrowthData", () => ({
        totalUsers: 2000,  // Example: Total registered users
        newUsers: 150,  // Example: New signups this month
        activeUsers: 1350,  // Example: Users active in the last month
        userGrowthData: [100, 120, 140, 130, 150], // Monthly user growth trend
        interestData: [450, 380, 320, 280, 240], // Example: Most popular networking interests

        init() {
            this.loadUserGrowthChart();
            this.loadInterestChart();
        },

        loadUserGrowthChart() {
            const ctx = document.getElementById('userGrowthChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: 'New Users',
                        data: this.userGrowthData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    }]
                },
                options: { responsive: true }
            });
        },

        loadInterestChart() {
            const ctx = document.getElementById('interestChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Entrepreneurship', 'Marketing', 'Tech Startups', 'Investing', 'E-commerce'],
                    datasets: [{
                        data: this.interestData,
                        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF33A6']
                    }]
                },
                options: { responsive: true }
            });
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("engagementData", () => ({
        predictedGrowth: 180,  // AI-predicted new users next month
        engagementScore: 75,  // Percentage of users active
        churnRisk: 220,  // Users likely to churn

        aiGrowthData: [100, 120, 140, 130, 150, 180], // AI-predicted trend

        init() {
            this.loadAIGrowthChart();
        },

        loadAIGrowthChart() {
            const ctx = document.getElementById('aiGrowthChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Predicted User Growth',
                        data: this.aiGrowthData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        fill: true
                    }]
                },
                options: { responsive: true }
            });
        }
    }));
});
document.addEventListener("alpine:init", () => {
    Alpine.data("aiReports", () => ({
        churnUsers: [
            { id: 1, name: "John Doe", lastActive: "Last seen 45 days ago" },
            { id: 2, name: "Alice Smith", lastActive: "Last seen 38 days ago" },
            { id: 3, name: "Michael Brown", lastActive: "Last seen 50 days ago" }
        ],

        downloadReport() {
            const csvContent = "User,Last Active\n" + this.churnUsers.map(u => `${u.name},${u.lastActive}`).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "AI_User_Report.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }));
});
document.addEventListener("DOMContentLoaded", function () {
    const retentionCtx = document.getElementById("retentionChart").getContext("2d");
    new Chart(retentionCtx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Retention Rate (%)",
                data: [82, 78, 75, 73, 70, 68],
                borderColor: "#4F46E5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                fill: true
            }]
        }
    });

    const dropoffCtx = document.getElementById("dropoffChart").getContext("2d");
    new Chart(dropoffCtx, {
        type: "bar",
        data: {
            labels: ["Inactive 1 Week", "Inactive 2 Weeks", "Inactive 1 Month", "Inactive 2 Months"],
            datasets: [{
                label: "Users Lost",
                data: [50, 120, 250, 500],
                backgroundColor: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6"]
            }]
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const activeUsersCtx = document.getElementById("activeUsersChart").getContext("2d");
    new Chart(activeUsersCtx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Active Users",
                data: [200, 400, 700, 1200],
                borderColor: "#22C55E",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                fill: true
            }]
        }
    });

    const popularFeaturesCtx = document.getElementById("popularFeaturesChart").getContext("2d");
    new Chart(popularFeaturesCtx, {
        type: "bar",
        data: {
            labels: ["Messaging", "Activity Feed", "Networking Events", "Matchmaking"],
            datasets: [{
                label: "Usage Count",
                data: [500, 300, 200, 400],
                backgroundColor: ["#F43F5E", "#3B82F6", "#F59E0B", "#10B981"]
            }]
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const activeUsersCtx = document.getElementById("activeUsersChart").getContext("2d");
    new Chart(activeUsersCtx, {
        type: "line",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Active Users",
                data: [200, 400, 700, 1200],
                borderColor: "#22C55E",
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                fill: true
            }]
        }
    });

    const popularFeaturesCtx = document.getElementById("popularFeaturesChart").getContext("2d");
    new Chart(popularFeaturesCtx, {
        type: "bar",
        data: {
            labels: ["Messaging", "Activity Feed", "Networking Events", "Matchmaking"],
            datasets: [{
                label: "Usage Count",
                data: [500, 300, 200, 400],
                backgroundColor: ["#F43F5E", "#3B82F6", "#F59E0B", "#10B981"]
            }]
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const userDropOffCtx = document.getElementById("userDropOffChart").getContext("2d");
    new Chart(userDropOffCtx, {
        type: "bar",
        data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [{
                label: "Predicted Drop-Off Users",
                data: [50, 120, 200, 340],
                backgroundColor: ["#F59E0B", "#F43F5E", "#10B981", "#3B82F6"]
            }]
        }
    });

    document.getElementById("alertInactiveUsers").addEventListener("click", function () {
        Swal.fire({
            title: "🚨 Inactive Users Alert!",
            text: "AI has detected 340 users at risk of dropping off. Send reminders?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Send Alerts!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("✅ Alerts Sent!", "Users have been notified via email.", "success");
            }
        });
    });
});
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));

    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');
}
// Function to handle page switching
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
}

// Sample user data (to simulate database records)
const users = [
    { name: "John Doe", role: "Investor", location: "New York" },
    { name: "Jane Smith", role: "Entrepreneur", location: "London" },
    { name: "David Lee", role: "Business Owner", location: "San Francisco" },
];

// Display users dynamically
function loadUsers() {
    const usersList = document.getElementById("user-list");
    usersList.innerHTML = ""; // Clear existing content

    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.className = "user-card";
        userCard.innerHTML = `<strong>${user.name}</strong> <br> ${user.role} - ${user.location}`;
        usersList.appendChild(userCard);
    });
}

// Simulate a message being sent
function sendMessage() {
    const input = document.getElementById("messageInput");
    const messageList = document.getElementById("messageList");
    
    if (input.value.trim() !== "") {
        const message = document.createElement("p");
        message.textContent = `You: ${input.value}`;
        messageList.appendChild(message);
        input.value = "";
    }
}

// Load users when the page opens
document.addEventListener("DOMContentLoaded", loadUsers);
// Simulated stats (Can be fetched from backend)
document.getElementById("total-users").textContent = "2,000";
document.getElementById("active-connections").textContent = "580";
document.getElementById("messages-sent").textContent = "12,500";

// Chart.js for User Growth
const ctx = document.getElementById('userChart').getContext('2d');
const userChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'User Growth',
            data: [500, 800, 1200, 1600, 1900, 2000],
            borderColor: '#007bff',
            fill: false
        }]
    }
});