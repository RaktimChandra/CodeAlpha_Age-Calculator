// Current date from system
const CURRENT_DATE = new Date('2025-03-10');

// Zodiac sign data
const ZODIAC_SIGNS = [
    { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [1, 19], traits: 'Ambitious, persistent, practical' },
    { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18], traits: 'Independent, original, humanitarian' },
    { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20], traits: 'Compassionate, artistic, intuitive' },
    { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19], traits: 'Energetic, courageous, enthusiastic' },
    { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20], traits: 'Patient, reliable, determined' },
    { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20], traits: 'Adaptable, versatile, communicative' },
    { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22], traits: 'Emotional, nurturing, protective' },
    { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22], traits: 'Creative, passionate, generous' },
    { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22], traits: 'Analytical, helpful, precise' },
    { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22], traits: 'Diplomatic, gracious, fair-minded' },
    { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21], traits: 'Resourceful, powerful, passionate' },
    { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21], traits: 'Optimistic, adventurous, honest' }
];

// Life milestones for timeline
const MILESTONES = [
    { age: 0, title: 'Birth', description: 'The beginning of your journey' },
    { age: 1, title: 'First Steps', description: 'Learning to walk and explore the world' },
    { age: 5, title: 'School Start', description: 'Beginning formal education' },
    { age: 13, title: 'Teenage Years', description: 'Enter adolescence' },
    { age: 18, title: 'Adult Life', description: 'Legal adulthood in most countries' },
    { age: 21, title: 'Full Adulthood', description: 'Legal adulthood worldwide' },
    { age: 25, title: 'Quarter Century', description: '25 years of experiences and growth' },
    { age: 30, title: 'Established Adult', description: 'Career and personal life milestone' },
    { age: 40, title: 'Mid-Life', description: 'Peak of career and life experience' },
    { age: 50, title: 'Golden Years Begin', description: 'Time of wisdom and reflection' },
    { age: 65, title: 'Retirement Age', description: 'Traditional retirement milestone' },
    { age: 75, title: 'Diamond Years', description: 'Time of sharing wisdom' },
    { age: 90, title: 'Nonagenarian', description: 'A life rich in experiences' },
    { age: 100, title: 'Centenarian', description: 'A century of life' }
];

function switchTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content and activate button
    document.getElementById(tabName + '-calculator').classList.add('active');
    event.target.classList.add('active');
}

function calculateAge() {
    const birthDateInput = document.getElementById('birthDate').value;
    const resultElement = document.getElementById('result');
    const extraInfo = document.getElementById('extra-info');
    
    if (!birthDateInput) {
        showError(resultElement, 'Please select a date of birth');
        resetDetails();
        return;
    }

    const birthDate = new Date(birthDateInput);
    
    if (birthDate > CURRENT_DATE) {
        showError(resultElement, 'Birth date cannot be in the future');
        resetDetails();
        return;
    }

    // Calculate the difference in years
    let years = CURRENT_DATE.getFullYear() - birthDate.getFullYear();
    let months = CURRENT_DATE.getMonth() - birthDate.getMonth();
    let days = CURRENT_DATE.getDate() - birthDate.getDate();

    // Adjust months and years if days are negative
    if (days < 0) {
        months--;
        const lastMonth = new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth() - 1, 0);
        days += lastMonth.getDate();
    }

    // Adjust years if months are negative
    if (months < 0) {
        years--;
        months += 12;
    }

    // Update the detail boxes
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;

    // Calculate next birthday
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(CURRENT_DATE.getFullYear());
    if (nextBirthday < CURRENT_DATE) {
        nextBirthday.setFullYear(CURRENT_DATE.getFullYear() + 1);
    }

    const timeToNextBirthday = nextBirthday - CURRENT_DATE;
    const birthdayMonths = Math.floor(timeToNextBirthday / (1000 * 60 * 60 * 24 * 30.436875));
    const birthdayDays = Math.floor((timeToNextBirthday % (1000 * 60 * 60 * 24 * 30.436875)) / (1000 * 60 * 60 * 24));
    const birthdayHours = Math.floor((timeToNextBirthday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById('countdown-months').textContent = birthdayMonths;
    document.getElementById('countdown-days').textContent = birthdayDays;
    document.getElementById('countdown-hours').textContent = birthdayHours;

    // Format the main result
    let result = `You are ${years} years`;
    if (months > 0) result += `, ${months} months`;
    if (days > 0) result += `, and ${days} days old`;
    
    resultElement.innerHTML = result;
    resultElement.style.color = 'var(--text-color)';

    // Calculate and show extra information
    const extraDetails = calculateExtraDetails(birthDate, years);
    extraInfo.innerHTML = extraDetails;
    extraInfo.classList.add('show');
}

function calculateExtraDetails(birthDate, years) {
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(CURRENT_DATE.getFullYear());
    
    // If birthday has passed this year, look at next year
    if (nextBirthday < CURRENT_DATE) {
        nextBirthday.setFullYear(CURRENT_DATE.getFullYear() + 1);
    }

    const daysToNextBirthday = Math.ceil((nextBirthday - CURRENT_DATE) / (1000 * 60 * 60 * 24));
    const totalDays = Math.floor((CURRENT_DATE - birthDate) / (1000 * 60 * 60 * 24));
    const weekDay = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
    const totalHours = totalDays * 24;
    const totalWeeks = Math.floor(totalDays / 7);
    
    return `
        <strong>Fun Facts:</strong><br>
        • You were born on a ${weekDay}<br>
        • You've lived for approximately ${totalDays.toLocaleString()} days<br>
        • That's about ${totalHours.toLocaleString()} hours!<br>
        • You've experienced ${totalWeeks.toLocaleString()} weeks<br>
        • Your next birthday is in ${daysToNextBirthday} days<br>
        • You've seen about ${(years * 365.25).toFixed(0)} sunrises
    `;
}

function calculateDateDifference() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const diffResult = document.getElementById('diff-result');

    if (!startDate.getTime() || !endDate.getTime()) {
        showError(diffResult, 'Please select both dates');
        return;
    }

    if (startDate > endDate) {
        showError(diffResult, 'Start date must be before end date');
        return;
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth());
    const diffYears = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;

    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    let result = `<strong>Time Difference:</strong><br>`;
    if (diffYears > 0) result += `• ${diffYears} year${diffYears > 1 ? 's' : ''}<br>`;
    if (remainingMonths > 0) result += `• ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}<br>`;
    result += `• ${weeks} week${weeks > 1 ? 's' : ''}<br>`;
    if (remainingDays > 0) result += `• ${remainingDays} day${remainingDays > 1 ? 's' : ''}<br>`;
    result += `<br>Total: ${diffDays.toLocaleString()} days`;

    diffResult.innerHTML = result;
    diffResult.style.color = 'var(--text-color)';
}

function calculateZodiac() {
    const birthDate = new Date(document.getElementById('zodiacDate').value);
    const zodiacSign = document.getElementById('zodiac-sign');
    const zodiacInfo = document.getElementById('zodiac-info');

    if (!birthDate.getTime()) {
        showError(zodiacSign, 'Please select your birth date');
        zodiacInfo.innerHTML = '';
        return;
    }

    const month = birthDate.getMonth() + 1; // JavaScript months are 0-based
    const day = birthDate.getDate();

    const sign = ZODIAC_SIGNS.find(sign => {
        if (sign.name === 'Capricorn') {
            return (month === 12 && day >= 22) || (month === 1 && day <= 19);
        }
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
    });

    zodiacSign.innerHTML = `
        <div style="font-size: 4rem;">${sign.symbol}</div>
        <div style="font-size: 1.5rem; color: var(--primary-color);">${sign.name}</div>
    `;

    zodiacInfo.innerHTML = `
        <p style="margin-top: 1rem;"><strong>Traits:</strong> ${sign.traits}</p>
        <p style="margin-top: 0.5rem;">Element: ${getZodiacElement(sign.name)}</p>
        <p>Quality: ${getZodiacQuality(sign.name)}</p>
    `;

    updateCompatibility(sign.name);
}

function getZodiacElement(sign) {
    const elements = {
        'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
        'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
        'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
        'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    return elements[sign];
}

function getZodiacQuality(sign) {
    const qualities = {
        'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
        'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
        'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
    };
    return qualities[sign];
}

function generateTimeline() {
    const birthDate = new Date(document.getElementById('timelineDate').value);
    const timelineContainer = document.getElementById('milestone-container');

    if (!birthDate.getTime()) {
        showError(timelineContainer, 'Please select your birth date');
        return;
    }

    const age = Math.floor((CURRENT_DATE - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
    let timelineHTML = '';

    MILESTONES.forEach(milestone => {
        const milestoneDate = new Date(birthDate);
        milestoneDate.setFullYear(birthDate.getFullYear() + milestone.age);
        
        const isPast = milestoneDate <= CURRENT_DATE;
        const isFuture = milestoneDate > CURRENT_DATE;
        
        if (milestone.age <= age + 10) { // Show past milestones and next 10 years
            timelineHTML += `
                <div class="milestone" style="opacity: ${isPast ? '1' : '0.7'}">
                    <div class="milestone-title">
                        ${milestone.title} (${milestone.age} years)
                        ${isPast ? '' : isFuture ? '' : ''}
                    </div>
                    <div class="milestone-description">
                        ${milestone.description}<br>
                        <small>${milestoneDate.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric'
                        })}</small>
                    </div>
                </div>
            `;
        }
    });

    timelineContainer.innerHTML = timelineHTML;
    timelineContainer.style.color = 'var(--text-color)';
}

function shareResults() {
    const activeTab = document.querySelector('.tab-content.active');
    const result = activeTab.querySelector('.result').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: 'Age Calculator Results',
            text: result
        }).catch(console.error);
    } else {
        // Fallback copy to clipboard
        navigator.clipboard.writeText(result)
            .then(() => {
                alert('Results copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
}

function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle');
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        themeButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
}

function showError(element, message) {
    element.innerHTML = message;
    element.style.color = 'var(--error-color)';
}

function resetDetails() {
    document.getElementById('years').textContent = '-';
    document.getElementById('months').textContent = '-';
    document.getElementById('days').textContent = '-';
    document.getElementById('extra-info').classList.remove('show');
}

function calculateStats() {
    const birthDate = new Date(document.getElementById('statsDate').value);
    const statsGrid = document.getElementById('stats-grid');
    const statsChart = document.getElementById('stats-chart');

    if (!birthDate.getTime()) {
        showError(statsGrid, 'Please select your birth date');
        return;
    }

    const now = CURRENT_DATE;
    const ageInMilliseconds = now - birthDate;
    const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInMonths = Math.floor(ageInDays / 30.436875); // Average month length
    const ageInYears = Math.floor(ageInDays / 365.25);

    const heartbeats = Math.floor(ageInMinutes * 80); // Average 80 beats per minute
    const breaths = Math.floor(ageInMinutes * 12); // Average 12 breaths per minute
    const sleepTime = Math.floor(ageInHours * 0.33); // Average 8 hours of sleep per day
    const words = Math.floor(ageInDays * 7000); // Average 7000 words spoken per day
    const steps = Math.floor(ageInDays * 4000); // Average 4000 steps per day
    const meals = Math.floor(ageInDays * 3); // Average 3 meals per day

    statsGrid.innerHTML = `
        <div class="stat-item">
            <div class="stat-value">${ageInSeconds.toLocaleString()}</div>
            <div class="stat-label">Seconds Lived</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${ageInMinutes.toLocaleString()}</div>
            <div class="stat-label">Minutes Lived</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${ageInHours.toLocaleString()}</div>
            <div class="stat-label">Hours Lived</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${ageInWeeks.toLocaleString()}</div>
            <div class="stat-label">Weeks Lived</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${heartbeats.toLocaleString()}</div>
            <div class="stat-label">Heartbeats</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${breaths.toLocaleString()}</div>
            <div class="stat-label">Breaths Taken</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${sleepTime.toLocaleString()}</div>
            <div class="stat-label">Hours of Sleep</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${words.toLocaleString()}</div>
            <div class="stat-label">Words Spoken</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${steps.toLocaleString()}</div>
            <div class="stat-label">Steps Taken</div>
        </div>
        <div class="stat-item">
            <div class="stat-value">${meals.toLocaleString()}</div>
            <div class="stat-label">Meals Eaten</div>
        </div>
    `;

    // Add interesting facts about the birth date
    const weekDay = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.toLocaleDateString('en-US', { month: 'long' });
    
    statsChart.innerHTML = `
        <h3>Interesting Facts About Your Birth Date</h3>
        <ul class="fact-list">
            <li>You were born on a ${weekDay}</li>
            <li>You've experienced approximately ${Math.floor(ageInDays/365.25)} leap years</li>
            <li>You've lived through ${Math.floor(ageInDays/30.436875)} full moons</li>
            <li>You've completed about ${Math.floor(ageInDays)} rotations with Earth</li>
            <li>You've traveled roughly ${Math.floor(ageInDays * 1.6).toLocaleString()} million miles through space with Earth</li>
        </ul>
    `;
}

function updateCompatibility(sign) {
    const compatibility = document.getElementById('compatibility');
    const compatibilitySigns = getCompatibleSigns(sign);
    
    compatibility.innerHTML = `
        <div class="compatibility-title">Compatible Signs</div>
        <div class="compatibility-list">
            ${compatibilitySigns.map(s => `
                <div class="compatibility-item">
                    ${ZODIAC_SIGNS.find(z => z.name === s).symbol} ${s}
                </div>
            `).join('')}
        </div>
    `;
}

function getCompatibleSigns(sign) {
    const compatibilityMap = {
        'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
        'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
        'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
        'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
        'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
        'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
        'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
        'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
        'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
        'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
        'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
        'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    };
    return compatibilityMap[sign] || [];
}
