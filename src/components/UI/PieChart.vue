<template>
  <div class="chart-container">
    <Pie 
      :data="chartData" 
      :options="chartOptions"
      :height="300"
    />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  Title
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    answers: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      const labels = []
      const data = []
      const backgroundColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
      ]

      Object.entries(this.answers).forEach(([question, answer], index) => {
        if (Array.isArray(answer)) {
          labels.push(question)
          data.push(answer.length)
        } 
        else if (typeof answer === 'string' && answer.trim() !== '') {
          labels.push(question)
          data.push(1)
        }
      })

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors.slice(0, labels.length),
            hoverBackgroundColor: backgroundColors.slice(0, labels.length),
            borderWidth: 2,
            borderColor: '#fff'
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14,
              },
              usePointStyle: true,
            }
          },
          title: {
            display: true,
            text: 'Распределение ответов',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>