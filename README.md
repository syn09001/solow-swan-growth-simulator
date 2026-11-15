# Solow–Swan Economic Growth Simulator

An interactive simulation of the Solow–Swan neoclassical growth model, illustrating how an economy dynamically adjusts toward a new steady-state equilibrium following changes in economic parameters.

## Overview

The simulator allows users to investigate how changes in savings, depreciation, population growth, technological progress, capital's share of income, and productivity affect an economy's long-run equilibrium and transitional dynamics.

The application visualizes the evolution of six endogenous variables: capital, output, consumption, investment, real wages, and the real interest rate.

## Features

- Interactive adjustment of six economic parameters using sliders or percentage-change inputs.
- Calculation and comparison of initial and new steady-state equilibria.
- Simulation of economic adjustment following parameter shocks.
- Six time-series charts illustrating the transition between steady states.
- Ability to adopt the new steady state as the starting point for subsequent experiments.

## Economic Model

The simulator implements a Cobb–Douglas production function:

`y = A × k^α`

Capital accumulation follows:

`Δk = s × A × k^α − (n + g + δ) × k`

The steady-state capital stock per effective worker is:

`k* = [sA / (n + g + δ)]^(1 / (1 − α))`

Where:

- `k` — Capital per effective worker
- `y` — Output per effective worker
- `s` — Savings rate
- `δ` — Depreciation rate
- `n` — Population growth rate
- `g` — Technological progress rate
- `α` — Capital's share of income
- `A` — Productivity scaling parameter

The application uses a one-period numerical update of the capital-accumulation equation to simulate transitional dynamics.

## Using the Simulator

Adjust one or more parameters to introduce an economic shock at time zero. The application displays the economy's initial steady state, calculates the new steady-state target, and plots the transition over 100 periods.

For example, increasing the savings rate illustrates how higher investment affects capital accumulation, output, and long-run consumption.

The **Adopt New Steady State** button allows further experiments from the newly established equilibrium.

## Technology

- React and TypeScript
- Vite
- Recharts for interactive data visualization

## Development

The original Solow–Swan simulator was independently programmed in Python. Google AI Studio was subsequently used to assist in developing and polishing the interactive web application.

This repository contains the web application implementation.

## Purpose

This project was developed as an independent exploration of macroeconomic theory and computational economic modeling. It is intended for educational use and theoretical experimentation rather than empirical economic forecasting.
