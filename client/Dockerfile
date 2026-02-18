# # --- STAGE 1: Dependencies ---
# FROM node:20-alpine AS deps
# RUN apk add --no-cache 
# WORKDIR /app

# COPY package.json package-lock.json* ./
# RUN npm ci

# #  STAGE 2: Builder 
# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Disable Next.js telemetry during the build
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN npx prisma generate

# RUN npm run build

# #  STAGE 3: Runner 
# FROM node:20-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1



# # Copy only the necessary files from the builder stage
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000
# ENV PORT 3000

# CMD ["npm", "run", "dev"]


FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm i

# Copy all source code
COPY . .

# Expose port
EXPOSE 3000

# Run in development mode
CMD ["npm", "run", "dev"]