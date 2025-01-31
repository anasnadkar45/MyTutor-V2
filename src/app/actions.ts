"use server"
import { requireUser } from "./utils/hooks";
import { z } from "zod";
import { AccountType, ServiceType } from "@prisma/client";
import prisma from "./utils/db";
import { revalidatePath } from "next/cache";
import { StreamClient } from "@stream-io/node-sdk";
import { signOut } from "./utils/auth";

export async function getUserData() {
    const session = await requireUser();
    const data = await prisma.user.findUnique({
        where: {
            id: session.user?.id
        }
    })
    return data
}

export async function handleSignOut() {
    await signOut()
}

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
};

export const streamTokenProvider = async () => {
    const user = await getUserData();

    if (!user) throw new Error("User not authenticated");

    const streamClient = new StreamClient(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        process.env.STREAM_SECRET_KEY!
    );

    const token = streamClient.generateUserToken({ user_id: user.id });

    return token;
};

const onboardingSchema = z.object({
    accountName: z
        .string()
        .min(1, { message: "Your preference is required" }),
    subjectIntrested: z
        .string()
        .min(3, { message: "Subject is required" }),
    experience: z
        .string()
        .min(3, { message: "Experience is required" }),
})

export async function onboardUser(prevState: any, formData: FormData) {
    const session = await requireUser()
    const user = session.user;

    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new project."
        };
    }

    const validateFields = onboardingSchema.safeParse({
        accountName: formData.get('accountName'),
        subjectIntrested: formData.get('subjectIntrested'),
        experience: formData.get('experience'),
    });

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!currentUser?.onboardingComplete) {
        try {
            const data = await prisma.onboarding.create({
                data: {
                    accountName: validateFields.data.accountName as AccountType,
                    experience: validateFields.data.experience,
                    subjectIntrested: validateFields.data.subjectIntrested,
                    userId: user.id
                }
            })

            if (data) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        accountName: validateFields.data.accountName as AccountType,
                        onboardingComplete: true
                    }
                })
                return {
                    status: "success",
                    message: "You have been onboarded successfully."
                };
            }

            const state: State = {
                status: "success",
                message: "You have been onboarded successfully.",
            };
            return state;

        } catch (err) {
            return {
                status: "error",
                message: "An error occurred while creating the project. Please try again later."
            };
        }
    }
}

// ----------------------------------------------------------------



// ----------------------------------------------------------------
const serviceSchema = z.object({
    serviceType: z
        .string()
        .min(1, { message: "Service Category is required" }),
    title: z
        .string()
        .min(3, { message: "Title is required" }),
    description: z
        .string()
        .min(3, { message: "Short description is required" }),
    price: z
        .number(),
    duration: z
        .number(),
})

export async function createService(prevState: any, formData: FormData) {
    const user = await getUserData();
    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new project."
        };
    }

    const validateFields = serviceSchema.safeParse({
        serviceType: formData.get('serviceType'),
        title: formData.get('title'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        duration: Number(formData.get('duration')),
    });

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    if (user.accountName === "Tutor") {
        try {
            const data = await prisma.service.create({
                data: {
                    serviceType: validateFields.data.serviceType as ServiceType,
                    title: validateFields.data.title,
                    description: validateFields.data.description,
                    price: validateFields.data.price,
                    duration: validateFields.data.duration,
                    userId: user.id
                }
            })

            if (data) {
                return {
                    status: "success",
                    message: "Your service have been created successfully."
                };
            }

            const state: State = {
                status: "success",
                message: "Your service have been created successfully.",
            };
            return state;

        } catch (e) {
            return {
                status: "error",
                message: "An error occurred while creating the service. Please try again later."
            };
        }
    }
}

export async function updateService(prevState: any, formData: FormData) {
    const user = await getUserData();
    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new project."
        };
    }

    const validateFields = serviceSchema.safeParse({
        serviceType: formData.get('serviceType'),
        title: formData.get('title'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        duration: Number(formData.get('duration')),
    });

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const serviceId = formData.get('serviceId') as string;

    if (user.accountName === "Tutor") {
        try {
            const data = await prisma.service.update({
                where: {
                    id: serviceId,
                    userId: user.id
                },
                data: {
                    serviceType: validateFields.data.serviceType as ServiceType,
                    title: validateFields.data.title,
                    description: validateFields.data.description,
                    price: validateFields.data.price,
                    duration: validateFields.data.duration,
                    userId: user.id
                }
            })

            if (data) {
                revalidatePath(`/tutor/service/${serviceId}`)
                return {
                    status: "success",
                    message: "Your service have been updated successfully."
                };
            }

            const state: State = {
                status: "success",
                message: "Your service have been updated successfully.",
            };
            return state;

        } catch (e) {
            return {
                status: "error",
                message: "An error occurred while updating the service. Please try again later."
            };
        }
    }
}

export async function deleteService(prevState: any, formData: FormData) {
    const user = await getUserData()
    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to delete a service.",
        }
    }

    const serviceId = formData.get("serviceId") as string
    if (!serviceId) {
        return {
            status: "error",
            message: "Service ID is missing.",
        }
    }

    if (user.accountName === "Tutor") {
        try {
            await prisma.booking.deleteMany({
                where: {
                    serviceId: serviceId,
                },
            })

            await prisma.availableSlot.deleteMany({
                where: {
                    serviceId: serviceId,
                },
            })

            const deletedService = await prisma.service.delete({
                where: {
                    id: serviceId,
                    userId: user.id,
                },
            })

            if (deletedService) {
                revalidatePath(`/tutor/service/`)
                return {
                    status: "success",
                    message: "Your service has been deleted successfully.",
                }
            }

            const state: State = {
                status: "success",
                message: "Your service have been deleted successfully.",
            };
            return state;
        } catch (e) {
            console.error("Error deleting service:", e)
            return {
                status: "error",
                message: "An error occurred while deleting the service. Please try again later.",
            }
        }
    } else {
        return {
            status: "error",
            message: "You don't have permission to delete services.",
        }
    }
}

// ----------------------------------------------------------------

const timeSlotSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:mm)"),
})

export async function createTimeSlot(prevState: any, formData: FormData) {
    const user = await getUserData()
    if (!user?.id) {
        return {
            status: "error",
            message: "User not found. Please log in to add a new project.",
        }
    }

    // Get date and time from the form
    const dateStr = formData.get("date") as string
    const startTimeStr = formData.get("startTime") as string
    const endTimeStr = formData.get("endTime") as string

    if (!dateStr || !startTimeStr || !endTimeStr) {
        return {
            status: "error",
            message: "Date, Start Time, and End Time are required.",
        }
    }

    // Validate input format
    const validateFields = timeSlotSchema.safeParse({
        date: dateStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Validation failed.",
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    // Create Date objects in local time and store them directly
    const startTime = new Date(`${dateStr}T${startTimeStr}`)
    const endTime = new Date(`${dateStr}T${endTimeStr}`)

    const serviceId = formData.get("serviceId") as string
    if (user.accountName === "Tutor") {
        try {
            const data = await prisma.availableSlot.create({
                data: {
                    startTime,
                    endTime,
                    serviceId,
                },
            })

            if (data) {
                revalidatePath(`/tutor/service/${serviceId}`)
            }

            const state: State = {
                status: "success",
                message: "Your time slot has been created successfully.",
            }
            return state
        } catch (e) {
            return {
                status: "error",
                message: "An error occurred while creating the time slot. Please try again later.",
            }
        }
    }
}

const bookingSchema = z.object({
    slotId: z.string().min(1, "Time slot is required"),
    serviceId: z.string().min(1, "Service is required"),
    bookingType: z.string().min(1, "Booking type is required")
})

export async function bookTimeSlot(prevState: any, formData: FormData) {
    const user = await getUserData()
    if (!user?.id) {
        return {
            status: "error",
            message: "Please log in to book a service.",
        }
    }

    const validateFields = bookingSchema.safeParse({
        slotId: formData.get("slotId"),
        serviceId: formData.get("serviceId"),
        bookingType: formData.get("bookingType"),
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Invalid booking data.",
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    try {

        const booking = await prisma.booking.create({
            data: {
                serviceId: validateFields.data.serviceId,
                availableSlotId: validateFields.data.slotId,
                userId: user.id,
                bookingType: validateFields.data.bookingType as ServiceType
            }
        })

        const updateStatus = await prisma.availableSlot.update({
            where: {
                id: validateFields.data.slotId,

            },
            data: {
                isBooked: true
            }
        })

        if (booking) {
            revalidatePath(`/learner/discover/${validateFields.data.serviceId}`)
            return {
                status: "success",
                message: "Service booked successfully! Check your bookings for details.",
            }
        }
    } catch (error) {
        return {
            status: "error",
            message: "Failed to book the service. Please try again.",
        }
    }
}

const cancleBookingSchema = z.object({
    slotId: z.string().min(1, "Time slot is required"),
    serviceId: z.string().min(1, "Service is required"),
})
export async function cancleBooking(prevState: any, formData: FormData) {
    const user = await getUserData()
    if (!user?.id) {
        return {
            status: "error",
            message: "Please log in to book a service.",
        }
    }

    const validateFields = cancleBookingSchema.safeParse({
        slotId: formData.get("slotId"),
        serviceId: formData.get("serviceId"),
    })

    if (!validateFields.success) {
        return {
            status: "error",
            message: "Invalid booking data.",
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    const bookingId = formData.get("bookingId") as string;
    try {

        const booking = await prisma.booking.delete({
            where: {
                id: bookingId,
                serviceId: validateFields.data.serviceId,
                availableSlotId: validateFields.data.slotId,
            }
        })

        const updateStatus = await prisma.availableSlot.update({
            where: {
                id: validateFields.data.slotId,
            },
            data: {
                isBooked: false
            }
        })

        if (booking) {
            revalidatePath(`/learner/bookings`)
            revalidatePath(`/tutor/bookings`)
            return {
                status: "success",
                message: "Booking cancled successfully! Visit again.",
            }
        }
        const state: State = {
            status: "success",
            message: "Booking cancled successfully! Visit again.",
        };
        return state;
    } catch (error) {
        return {
            status: "error",
            message: "Failed to cancle the booking service. Please try again.",
        }
    }
}