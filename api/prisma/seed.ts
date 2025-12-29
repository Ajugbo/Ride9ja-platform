// Seed script - creates sample data for testing
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional)
  await prisma.payment.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Hash password for all users
  const passwordHash = await hashPassword('password123');

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ride9ja.com',
      name: 'Admin User',
      role: 'ADMIN',
      passwordHash,
      verified: true,
    },
  });

  await prisma.profile.create({
    data: {
      userId: admin.id,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      bio: 'System administrator',
      rating: 5.0,
    },
  });

  // Create sample riders
  const riders = await Promise.all([
    prisma.user.create({
      data: {
        email: 'rider1@example.com',
        name: 'John Rider',
        phone: '+2348012345678',
        role: 'RIDER',
        passwordHash,
        verified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'rider2@example.com',
        name: 'Sarah Passenger',
        phone: '+2348023456789',
        role: 'RIDER',
        passwordHash,
        verified: true,
      },
    }),
  ]);

  await Promise.all(
    riders.map((rider, index) =>
      prisma.profile.create({
        data: {
          userId: rider.id,
          avatarUrl: `https://i.pravatar.cc/150?img=${index + 10}`,
          bio: `Regular rider #${index + 1}`,
          rating: 4.5 + Math.random() * 0.5,
        },
      })
    )
  );

  // Create sample drivers
  const drivers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'driver1@example.com',
        name: 'Michael Driver',
        phone: '+2348034567890',
        role: 'DRIVER',
        passwordHash,
        verified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'driver2@example.com',
        name: 'David Chauffeur',
        phone: '+2348045678901',
        role: 'DRIVER',
        passwordHash,
        verified: true,
      },
    }),
  ]);

  const driverProfiles = await Promise.all(
    drivers.map((driver, index) =>
      prisma.profile.create({
        data: {
          userId: driver.id,
          avatarUrl: `https://i.pravatar.cc/150?img=${index + 20}`,
          bio: `Professional driver with ${index + 5} years experience`,
          rating: 4.0 + Math.random() * 1.0,
        },
      })
    )
  );

  // Create vehicles for drivers
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        driverId: drivers[0].id,
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        plateNumber: 'ABC123XY',
        color: 'Blue',
        verified: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        driverId: drivers[1].id,
        make: 'Honda',
        model: 'Accord',
        year: 2021,
        plateNumber: 'DEF456ZW',
        color: 'White',
        verified: true,
      },
    }),
  ]);

  // Update driver profiles with vehicle IDs
  await Promise.all([
    prisma.profile.update({
      where: { id: driverProfiles[0].id },
      data: { vehicleId: vehicles[0].id },
    }),
    prisma.profile.update({
      where: { id: driverProfiles[1].id },
      data: { vehicleId: vehicles[1].id },
    }),
  ]);

  // Create sample trips
  const trips = await Promise.all([
    prisma.trip.create({
      data: {
        riderId: riders[0].id,
        driverId: drivers[0].id,
        origin: 'Ikeja City Mall, Lagos',
        destination: 'Lekki Phase 1, Lagos',
        fare: 2500.00,
        status: 'COMPLETED',
        scheduledAt: new Date('2024-01-15T10:00:00Z'),
      },
    }),
    prisma.trip.create({
      data: {
        riderId: riders[1].id,
        driverId: drivers[1].id,
        origin: 'Victoria Island, Lagos',
        destination: 'Surulere, Lagos',
        fare: 1800.00,
        status: 'ONGOING',
      },
    }),
    prisma.trip.create({
      data: {
        riderId: riders[0].id,
        origin: 'GRA, Ilorin',
        destination: 'Airport Road, Ilorin',
        fare: 1200.00,
        status: 'REQUESTED',
      },
    }),
  ]);

  // Create sample payment
  await prisma.payment.create({
    data: {
      tripId: trips[0].id,
      payerId: riders[0].id,
      amount: 2500.00,
      provider: 'Paystack',
      status: 'PAID',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('📊 Sample data created:');
  console.log(`   👑 Admin: ${admin.email} (password: password123)`);
  console.log(`   🚶 Riders: ${riders.length} users`);
  console.log(`   🚗 Drivers: ${drivers.length} users with vehicles`);
  console.log(`   🚕 Trips: ${trips.length} trips`);
  console.log(`   💰 Payments: 1 sample payment`);

  // Display login credentials
  console.log('\n🔐 Test Credentials:');
  console.log('   Admin: admin@ride9ja.com / password123');
  console.log('   Rider: rider1@example.com / password123');
  console.log('   Driver: driver1@example.com / password123');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
